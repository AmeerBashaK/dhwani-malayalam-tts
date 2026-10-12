import React, { useState } from 'react';
import {
  Wand2,
  Languages,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Volume2,
  Loader2,
  Info,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { REGIONAL_DIALECTS } from '../data/dialects';
import { DialectAdaptationResponse } from '../types';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  selectedDialectId: string;
  onSynthesize: () => void;
  isSynthesizing: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const TextEditor: React.FC<TextEditorProps> = ({
  text,
  setText,
  selectedDialectId,
  onSynthesize,
  isSynthesizing,
  fontSize,
}) => {
  const [isAdapting, setIsAdapting] = useState(false);
  const [isTransliterating, setIsTransliterating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adaptationDetails, setAdaptationDetails] = useState<DialectAdaptationResponse | null>(null);
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);

  const currentDialect =
    REGIONAL_DIALECTS.find((d) => d.id === selectedDialectId) || REGIONAL_DIALECTS[0];

  // Font size classes
  const fontClass =
    fontSize === 'xlarge'
      ? 'text-2xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-xl leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  // Handle Dialect Adaptation
  const handleAdaptToDialect = async () => {
    if (!text.trim()) return;
    setIsAdapting(true);
    try {
      const response = await fetch('/api/dialects/adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetDialectId: selectedDialectId,
        }),
      });

      const data = await response.json();
      if (data.success && data.data?.adaptedText) {
        setText(data.data.adaptedText);
        setAdaptationDetails(data.data);
      }
    } catch (err) {
      console.error('Failed to adapt dialect:', err);
    } finally {
      setIsAdapting(false);
    }
  };

  // Handle Manglish Transliteration
  const handleTransliterate = async () => {
    if (!text.trim()) return;
    setIsTransliterating(true);
    try {
      const response = await fetch('/api/transliterate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manglishText: text }),
      });
      const data = await response.json();
      if (data.success && data.malayalamText) {
        setText(data.malayalamText);
      }
    } catch (err) {
      console.error('Failed to transliterate:', err);
    } finally {
      setIsTransliterating(false);
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setAdaptationDetails(null);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col">
      {/* Top Toolbar */}
      <div className="p-3 sm:px-5 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2 bg-stone-50/70">
        <div className="flex items-center gap-2">
          <label htmlFor="malayalam-input" className="text-sm font-bold text-stone-800 font-malayalam">
            മലയാളം വിവരണം (Text Input)
          </label>
          <span className="text-xs text-stone-400">•</span>
          <span className="text-xs text-stone-500 font-medium">
            {wordCount} വാക്കുകൾ ({charCount} അക്ഷരങ്ങൾ)
          </span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center flex-wrap gap-1.5">
          {/* Manglish converter */}
          <button
            onClick={handleTransliterate}
            disabled={!text.trim() || isTransliterating}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-40 transition-colors"
            title="Convert Manglish (e.g. 'sugham aano') to Malayalam Unicode script"
          >
            {isTransliterating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
            ) : (
              <Languages className="w-3.5 h-3.5 text-stone-600" />
            )}
            <span>മംഗ്ലീഷ് ➔ മലയാളം</span>
          </button>

          {/* Adapt to Dialect */}
          <button
            onClick={handleAdaptToDialect}
            disabled={!text.trim() || isAdapting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-all shadow-xs"
            title={`Rewrite text into authentic ${currentDialect.name} vocabulary and phrasing`}
          >
            {isAdapting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Wand2 className="w-3.5 h-3.5" />
            )}
            <span>{currentDialect.malayalamName.split('/')[0]} ശൈലിയിലേക്ക് മാറ്റുക</span>
          </button>

          {/* Sample Phrases Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>മാതൃകകൾ (Samples)</span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {showPresetsDropdown && (
              <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-20 space-y-1">
                <div className="px-2 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  {currentDialect.name} Presets
                </div>
                {currentDialect.samplePhrases.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setText(sample.malayalam);
                      setShowPresetsDropdown(false);
                      setAdaptationDetails(null);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-emerald-50 text-stone-800 transition-colors text-xs space-y-0.5"
                  >
                    <div className="font-malayalam font-bold text-stone-900 line-clamp-1">
                      {sample.malayalam}
                    </div>
                    <div className="text-[11px] text-stone-500 italic line-clamp-1">
                      {sample.english}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear & Copy */}
          {text && (
            <>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors"
                title="Copy text"
                aria-label="Copy text to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-red-600 transition-colors"
                title="Clear text"
                aria-label="Clear input text"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="p-4 sm:p-5 flex-1 min-h-[220px]">
        <textarea
          id="malayalam-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`ഇവിടെ മലയാളം ടൈപ്പ് ചെയ്യുക (അല്ലെങ്കിൽ മംഗ്ലീഷിൽ ടൈപ്പ് ചെയ്ത ശേഷം 'മംഗ്ലീഷ് ➔ മലയാളം' ക്ലിക്ക് ചെയ്യുക)...\n\nഉദാഹരണം: 'നമസ്കാരം, ഇന്ന് വിശേഷങ്ങൾ എന്തൊക്കെയാണ്? ഒരല്പം സംസാരിക്കാൻ സമയമുണ്ടോ?'`}
          className={`w-full h-full min-h-[180px] resize-y bg-transparent focus:outline-hidden font-malayalam text-stone-900 placeholder:text-stone-400 placeholder:font-normal font-normal ${fontClass}`}
          aria-label="Malayalam text to speak"
        />
      </div>

      {/* Dialect Transformation Info Panel (if adapted) */}
      {adaptationDetails && (
        <div className="border-t border-emerald-100 bg-emerald-50/40 p-4 sm:px-5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ശൈലീ സവിശേഷതകൾ (Dialect Nuances Applied)</span>
            </span>
            <button
              onClick={() => setAdaptationDetails(null)}
              className="text-[11px] text-emerald-800 hover:text-emerald-950 underline"
            >
              മറയ്ക്കുക (Dismiss)
            </button>
          </div>

          {adaptationDetails.culturalNote && (
            <p className="text-emerald-900 leading-relaxed font-medium">
              💡 {adaptationDetails.culturalNote}
            </p>
          )}

          {adaptationDetails.phoneticGuide && (
            <p className="text-stone-600">
              🗣️ <strong className="text-stone-700">ഉച്ചാരണ ശൈലി (Pronunciation tip):</strong>{' '}
              {adaptationDetails.phoneticGuide}
            </p>
          )}

          {adaptationDetails.vocabularyChanges && adaptationDetails.vocabularyChanges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-500">മാറ്റിയ വാക്കുകൾ:</span>
              {adaptationDetails.vocabularyChanges.map((change, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-900 font-medium"
                >
                  <span className="line-through text-stone-400 font-malayalam">{change.original}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-emerald-600" />
                  <span className="font-bold font-malayalam">{change.replacedWith}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Action Footer with Synthesize Button */}
      <div className="p-3 sm:px-5 border-t border-stone-100 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-500 flex items-center gap-2">
          <span>
            ശൈലി: <strong className="text-stone-800 font-malayalam">{currentDialect.malayalamName}</strong>
          </span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="hidden sm:inline">
            ഷോർട്ട്കട്ട്: <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Ctrl</kbd> +{' '}
            <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Enter</kbd>
          </span>
        </div>

        <button
          onClick={onSynthesize}
          disabled={!text.trim() || isSynthesizing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md shadow-emerald-700/20 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99] font-malayalam cursor-pointer"
        >
          {isSynthesizing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>ശബ്ദം സൃഷ്ടിക്കുന്നു... (Synthesizing)</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>ശബ്ദമുണ്ടാക്കുക (Generate Malayalam Speech)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
