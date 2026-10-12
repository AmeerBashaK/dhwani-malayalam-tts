import React from 'react';
import { X, Trash2, Play, Download, Bookmark, Clock, ArrowRight } from 'lucide-react';
import { AudioGenerationResult } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: AudioGenerationResult[];
  onSelectAudio: (audio: AudioGenerationResult) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectAudio,
  onClearHistory,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const handleDownload = (item: AudioGenerationResult) => {
    try {
      const byteCharacters = atob(item.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: item.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dhwani-${item.dialectId}-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-title"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-stone-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <h2 id="history-title" className="text-base font-bold text-stone-900 font-malayalam">
              സൃഷ്ടിച്ച ശബ്ദങ്ങൾ (Voice History)
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold">
              {history.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-2">
              <Clock className="w-8 h-8 stroke-[1.5]" />
              <p className="text-xs font-medium font-malayalam">
                ഇതുവരെ ഓഡിയോകൾ സൃഷ്ടിച്ചിട്ടില്ല.
              </p>
              <p className="text-[11px] text-stone-400">
                You haven't generated any voice clips yet. Clips you generate will appear here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-300 bg-white transition-all space-y-2 shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold font-malayalam border border-emerald-200/50">
                    {item.dialectName}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-stone-400">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                      title="Remove from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-malayalam text-stone-900 text-xs font-medium line-clamp-2">
                  {item.text}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                  <span className="text-stone-400">വോയ്സ്: {item.voiceName}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-1 rounded-md text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      title="Download audio"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectAudio(item);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>പ്ലേ ചെയ്യുക</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ചരിത്രം മായ്ക്കുക (Clear All)</span>
            </button>
            <button
              onClick={onClose}
              className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
            >
              അടയ്ക്കുക (Close)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
