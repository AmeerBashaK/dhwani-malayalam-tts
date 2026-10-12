import React from 'react';
import { REGIONAL_DIALECTS, DialectInfo } from '../data/dialects';
import { MapPin, Info, Sparkles, ChevronRight, Check } from 'lucide-react';

interface DialectSelectorProps {
  selectedDialectId: string;
  onSelectDialect: (dialectId: string) => void;
  onSelectSamplePhrase: (malayalamText: string) => void;
}

export const DialectSelector: React.FC<DialectSelectorProps> = ({
  selectedDialectId,
  onSelectDialect,
  onSelectSamplePhrase,
}) => {
  const currentDialect =
    REGIONAL_DIALECTS.find((d) => d.id === selectedDialectId) || REGIONAL_DIALECTS[0];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-stone-50/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h2 className="text-base font-bold text-stone-900 font-malayalam">
              പ്രാദേശിക ശൈലികൾ (Regional Dialects)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Select a Kerala regional dialect to tune speech cadence, vocabulary, and phonetic intonation.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60 self-start sm:self-auto">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{REGIONAL_DIALECTS.length} Kerala Dialects Supported</span>
        </div>
      </div>

      {/* Dialect Tabs / Cards */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {REGIONAL_DIALECTS.map((dialect) => {
            const isSelected = dialect.id === selectedDialectId;
            return (
              <button
                key={dialect.id}
                onClick={() => onSelectDialect(dialect.id)}
                className={`relative flex flex-col items-start p-3 rounded-xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/70 text-stone-700'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800/80">
                  {dialect.region.split('(')[0].trim()}
                </span>
                <span className="text-sm font-bold text-stone-900 font-malayalam mt-1 leading-tight">
                  {dialect.malayalamName.split('/')[0].trim()}
                </span>
                <span className="text-xs text-stone-500 font-medium truncate w-full mt-0.5">
                  {dialect.name.split('/')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Dialect Deep-Dive Banner */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-stone-50 to-emerald-50/30 border border-stone-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-stone-900 font-malayalam">
                  {currentDialect.malayalamName}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs font-semibold text-emerald-800">
                  {currentDialect.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700 font-medium">
                  {currentDialect.region}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentDialect.description}
              </p>

              {/* Key dialect traits tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-stone-500">സവിശേഷതകൾ:</span>
                {currentDialect.characteristics.slice(0, 3).map((trait, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 shadow-2xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="shrink-0 space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>ഉദാഹരണ വാക്യങ്ങൾ (Preset Samples):</span>
              </span>
              <div className="flex flex-col gap-1.5">
                {currentDialect.samplePhrases.slice(0, 2).map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSamplePhrase(phrase.malayalam)}
                    className="text-left text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-800 transition-colors flex items-center justify-between gap-2 shadow-2xs group"
                    title={phrase.english}
                  >
                    <span className="font-malayalam truncate max-w-[240px] sm:max-w-[280px]">
                      {phrase.malayalam}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform shrink-0">
                      ഉപയോഗിക്കുക →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
