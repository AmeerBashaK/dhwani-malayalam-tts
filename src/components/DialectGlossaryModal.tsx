import React, { useState } from 'react';
import { X, Search, BookOpen, Volume2, Sparkles, MapPin, Check } from 'lucide-react';
import { REGIONAL_DIALECTS, DialectInfo } from '../data/dialects';

interface DialectGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhrase: (phrase: string, dialectId: string) => void;
}

export const DialectGlossaryModal: React.FC<DialectGlossaryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhrase,
}) => {
  const [selectedDialectId, setSelectedDialectId] = useState<string>('malabar');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentDialect =
    REGIONAL_DIALECTS.find((d) => d.id === selectedDialectId) || REGIONAL_DIALECTS[0];

  const filteredVocabulary = currentDialect.vocabularySamples.filter(
    (item) =>
      item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dialect.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="glossary-title" className="text-lg font-bold text-stone-900 font-malayalam">
                കേരള ഭാഷാ നിഘണ്ടു (Kerala Dialects Glossary & Idioms)
              </h2>
              <p className="text-xs text-stone-500">
                Explore authentic regional vocabulary, phrases, and phonetic intonation across Kerala.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            aria-label="Close glossary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Region selector tabs */}
        <div className="p-3 sm:px-6 bg-stone-100/60 border-b border-stone-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {REGIONAL_DIALECTS.map((dialect) => {
            const isSelected = dialect.id === selectedDialectId;
            return (
              <button
                key={dialect.id}
                onClick={() => setSelectedDialectId(dialect.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                }`}
              >
                {dialect.malayalamName.split('/')[0]} ({dialect.name.split('/')[0]})
              </button>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="p-4 sm:px-6 border-b border-stone-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="വാക്കുകൾ അല്ലെങ്കിൽ അർത്ഥം തിരയുക (Search words or meanings)..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-stone-50/50"
            />
          </div>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Overview Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-950 font-malayalam">
                  {currentDialect.malayalamName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-800 font-medium">
                  {currentDialect.region}
                </span>
              </div>
              <p className="text-xs text-stone-600">{currentDialect.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
              {currentDialect.characteristics.map((trait, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white text-stone-700 border border-emerald-100 font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Vocabulary Comparison Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>പ്രാദേശിക പദാവലി (Colloquial Vocabulary Comparison)</span>
              <span className="text-stone-400">({filteredVocabulary.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredVocabulary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-300 bg-white transition-all space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-stone-400 font-medium">സാധാരണ മലയാളം (Standard):</div>
                      <div className="font-malayalam text-stone-700 text-xs font-bold">{item.standard}</div>
                    </div>
                    <span className="text-stone-300">➔</span>
                    <div className="text-right">
                      <div className="text-[11px] text-emerald-600 font-semibold">പ്രാദേശിക ശൈലി (Dialect):</div>
                      <div className="font-malayalam text-emerald-950 text-sm font-bold">
                        {item.dialect}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100 flex items-center justify-between">
                    <span>അർത്ഥം (Meaning): {item.meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Phrases */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>പ്രസിദ്ധമായ സംഭാഷണ മാതൃകകൾ (Authentic Sample Phrases)</span>
            </h3>

            <div className="space-y-2.5">
              {currentDialect.samplePhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-stone-200 text-stone-700">
                      {phrase.category}
                    </span>
                    <p className="font-malayalam font-bold text-stone-900 text-sm">
                      {phrase.malayalam}
                    </p>
                    <p className="text-xs text-stone-500 italic">
                      "{phrase.english}"
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectPhrase(phrase.malayalam, currentDialect.id);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shrink-0 self-start sm:self-auto font-malayalam cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>ശബ്ദമാക്കുക (Use This)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>
            ഡാറ്റാ ഉറവിടം: കേരള ഭാഷാ വൈവിധ്യങ്ങൾ & ജെമിനി വോയ്സ് സിന്തസിസ്
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold transition-colors"
          >
            പൂർത്തിയാക്കുക (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
