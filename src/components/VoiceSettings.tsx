import React from 'react';
import { GEMINI_VOICES, VoicePersona } from '../data/dialects';
import { Mic, Sliders, Sparkles, Activity, Gauge } from 'lucide-react';

interface VoiceSettingsProps {
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
  speakingRate: string;
  setSpeakingRate: (rate: string) => void;
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  ttsModel: string;
  setTtsModel: (model: string) => void;
}

const TONES = [
  { id: 'natural', name: 'സ്വാഭാവികം (Natural Conversational)', prompt: 'Natural conversational Malayalam with warm regional inflection' },
  { id: 'story', name: 'കഥാപ്രസംഗം (Expressive Storytelling)', prompt: 'Expressive storytelling tone with dramatic pauses and emotive modulation' },
  { id: 'broadcast', name: 'വാർത്താ ശൈലി (Formal Broadcast)', prompt: 'Crystal-clear news anchor style with articulate neutral pace' },
  { id: 'cheerful', name: 'ഉന്മേഷഭരിതം (Lively & Cheerful)', prompt: 'Enthusiastic, cheerful and vibrant delivery' },
  { id: 'calm', name: 'ശാന്തം (Gentle & Soothing)', prompt: 'Gentle, calm, peaceful and melodious voice' },
];

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  selectedVoiceId,
  onSelectVoice,
  speakingRate,
  setSpeakingRate,
  selectedTone,
  setSelectedTone,
  ttsModel,
  setTtsModel,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-5 space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-stone-900 font-malayalam">
            ശബ്ദ ക്രമീകരണങ്ങൾ (Voice Persona & Synthesis)
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          Gemini 2.5 Pro TTS Engine
        </span>
      </div>

      {/* Voice Selection Cards */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
          <span>ശബ്ദം തിരഞ്ഞെടുക്കുക (Voice Talent):</span>
          <span className="text-[11px] font-normal text-stone-500">5 Distinct Personas</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {GEMINI_VOICES.map((voice) => {
            const isSelected = voice.id === selectedVoiceId;
            return (
              <button
                key={voice.id}
                onClick={() => onSelectVoice(voice.id)}
                className={`flex flex-col p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500 text-emerald-950 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60 text-stone-700'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-stone-900 font-malayalam">
                    {voice.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                      voice.gender === 'Female'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {voice.gender === 'Female' ? 'സ്ത്രീ' : 'പുരുഷൻ'}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1">
                  {voice.toneTag}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                  {voice.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone & Style Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-stone-500" />
            <span>ശബ്ദഭാവം (Emotional Tone & Style):</span>
          </label>
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="w-full text-xs font-medium p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-malayalam"
          >
            {TONES.map((t) => (
              <option key={t.id} value={t.prompt}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Speaking Pace */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-stone-500" />
            <span>സംസാര വേഗത (Speaking Pace):</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'slow', label: 'പതിയെ (0.8x)', val: 'measured, relaxed pace' },
              { id: 'normal', label: 'സാധാരണ (1.0x)', val: 'standard natural pace' },
              { id: 'fast', label: 'വേഗത്തിൽ (1.2x)', val: 'brisk, energetic pace' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSpeakingRate(p.val)}
                className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  speakingRate === p.val
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
