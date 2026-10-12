import React, { useState } from 'react';
import { Volume2, BookOpen, History, HelpCircle, Sparkles, SlidersHorizontal, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  onOpenGlossary: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  fontSize,
  setFontSize,
  onOpenGlossary,
  onOpenHistory,
  historyCount,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      {/* Kasavu / Kerala inspired subtle golden-emerald top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-stone-900 font-malayalam flex items-center gap-1.5">
                <span>ധ്വനി</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-normal font-sans">
                  Dhwani TTS
                </span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                Gemini 2.5 Pro TTS
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Malayalam Voice Synthesis & Regional Dialects Studio
            </p>
          </div>
        </div>

        {/* Action Controls & Accessibility Tools */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Text Size Accessibility Controls */}
          <div
            className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200"
            role="group"
            aria-label="Text size control"
          >
            <span className="text-stone-500 px-1.5 font-medium select-none">അളവ്:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                fontSize === 'normal'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Standard Text Size (100%)"
              aria-pressed={fontSize === 'normal'}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                fontSize === 'large'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Large Text Size (115%)"
              aria-pressed={fontSize === 'large'}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                fontSize === 'xlarge'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Extra Large Text Size (130%)"
              aria-pressed={fontSize === 'xlarge'}
            >
              A++
            </button>
          </div>

          {/* Dialect Glossary button */}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium border border-stone-200 transition-colors"
            title="Browse regional Kerala dialects dictionary and famous idioms"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>നിഘണ്ടു (Glossary)</span>
          </button>

          {/* History button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium border border-stone-200 transition-colors relative"
            title="View saved voice generations"
          >
            <History className="w-3.5 h-3.5 text-stone-600" />
            <span>ചരിത്രം (History)</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 text-[10px] rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                {historyCount}
              </span>
            )}
          </button>

          {/* Shortcuts / Info */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            title="Keyboard shortcuts & accessibility guide"
            aria-label="Help and instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Help Modal / Drawer */}
      {showHelp && (
        <div className="border-t border-stone-200 bg-stone-50 px-4 py-3 text-xs text-stone-700 animate-in fade-in duration-150">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-semibold text-stone-900">
                ⌨️ സുഗമമായ ഉപയോഗം (Quick Controls & Accessibility):
              </p>
              <p className="text-stone-600">
                • <kbd className="px-1.5 py-0.5 bg-white border rounded text-[11px] font-mono">Ctrl</kbd> +{' '}
                <kbd className="px-1.5 py-0.5 bg-white border rounded text-[11px] font-mono">Enter</kbd> : ശബ്ദം സൃഷ്ടിക്കുക (Synthesize Voice) |{' '}
                <kbd className="px-1.5 py-0.5 bg-white border rounded text-[11px] font-mono">Space</kbd> : പ്ലേ / പോസ് (Play / Pause Audio)
              </p>
              <p className="text-stone-600">
                • മലയാളം അല്ലെങ്കിൽ മംഗ്ലീഷ് (Manglish) ടൈപ്പ് ചെയ്ത് പ്രാദേശിക ശൈലികളിലേക്ക് മാറ്റാം (Malabar, Valluvanadan, Thrissur, Travancore, Kottayam, Kasaragod).
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="text-stone-500 hover:text-stone-800 underline font-medium self-end md:self-auto"
            >
              അടയ്ക്കുക (Close)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
