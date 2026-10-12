/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { DialectSelector } from './components/DialectSelector';
import { TextEditor } from './components/TextEditor';
import { VoiceSettings } from './components/VoiceSettings';
import { AudioPlayer } from './components/AudioPlayer';
import { DialectGlossaryModal } from './components/DialectGlossaryModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AudioGenerationResult } from './types';
import { REGIONAL_DIALECTS, GEMINI_VOICES } from './data/dialects';
import { AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

const INITIAL_TEXT = 'നമസ്കാരം! ദൈവത്തിന്റെ സ്വന്തം നാടായ കേരളത്തിലെ വിവിധ പ്രാദേശിക ശൈലികളിൽ സ്വാഭാവികമായ ശബ്ദം കേൾക്കാൻ ധ്വനിയിലേക്ക് സ്വാഗതം.';

export default function App() {
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [selectedDialectId, setSelectedDialectId] = useState<string>('malabar');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('kore');
  const [speakingRate, setSpeakingRate] = useState<string>('standard natural pace');
  const [selectedTone, setSelectedTone] = useState<string>('Natural conversational Malayalam with warm regional inflection');
  const [ttsModel, setTtsModel] = useState<string>('gemini-3.8-flash-tts');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<AudioGenerationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modals
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Saved History
  const [history, setHistory] = useState<AudioGenerationResult[]>(() => {
    try {
      const saved = localStorage.getItem('dhwani_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dhwani_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dhwani_history', JSON.stringify(history));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('dhwani_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('localStorage bookmark save failed', e);
    }
  }, [bookmarkedIds]);

  const handleSynthesize = useCallback(async () => {
    if (!text.trim() || isSynthesizing) return;
    setIsSynthesizing(true);
    setErrorMessage(null);

    const voice = GEMINI_VOICES.find((v) => v.id === selectedVoiceId) || GEMINI_VOICES[0];
    const dialect = REGIONAL_DIALECTS.find((d) => d.id === selectedDialectId) || REGIONAL_DIALECTS[0];

    try {
      const response = await fetch('/api/tts/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          dialectId: selectedDialectId,
          voiceName: voice.geminiVoice,
          model: ttsModel,
          customStyle: `${dialect.ttsStylePrompt} ${selectedTone}. Pace: ${speakingRate}.`,
          speakingRate,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to synthesize speech audio from Gemini API.');
      }

      const newAudioResult: AudioGenerationResult = {
        id: `audio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        text: text.trim(),
        audioBase64: data.audioBase64,
        mimeType: data.mimeType || 'audio/wav',
        dialectId: dialect.id,
        dialectName: dialect.name,
        voiceName: voice.name,
        model: ttsModel,
        timestamp: Date.now(),
      };

      setCurrentAudio(newAudioResult);
      setHistory((prev) => [newAudioResult, ...prev.slice(0, 24)]);
      setSuccessToast(`ശബ്ദം തയ്യാറായി! (${dialect.malayalamName.split('/')[0]})`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      console.error('Synthesis error:', err);
      setErrorMessage(
        err.message || 'Error occurred while generating speech. Please verify connection and try again.'
      );
    } finally {
      setIsSynthesizing(false);
    }
  }, [text, isSynthesizing, selectedVoiceId, selectedDialectId, ttsModel, selectedTone, speakingRate]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSynthesize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSynthesize]);

  const handleBookmark = (item: AudioGenerationResult) => {
    if (bookmarkedIds.includes(item.id)) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      setBookmarkedIds((prev) => [...prev, item.id]);
    }
  };

  const handleSelectSamplePhrase = (phrase: string) => {
    setText(phrase);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* App Header */}
      <Header
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Error Notification Alert */}
        {errorMessage && (
          <div
            className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs animate-in slide-in-from-top-2"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-bold">ശബ്ദനിർമ്മാണത്തിൽ തടസ്സം നേരിട്ടു (Synthesis Notice):</p>
              <p className="text-red-700 leading-relaxed">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-800 text-xs font-bold underline"
            >
              മാറ്റുക
            </button>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div
            className="p-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-medium flex items-center justify-between shadow-md shadow-emerald-900/20 animate-in slide-in-from-top-2 font-malayalam"
            role="status"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-emerald-200 hover:text-white text-xs underline font-sans"
            >
              Close
            </button>
          </div>
        )}

        {/* 1. Regional Dialect Selector */}
        <section aria-labelledby="dialects-section">
          <DialectSelector
            selectedDialectId={selectedDialectId}
            onSelectDialect={setSelectedDialectId}
            onSelectSamplePhrase={handleSelectSamplePhrase}
          />
        </section>

        {/* 2. Text Input & Editor with Manglish + Dialect Adaptation */}
        <section aria-labelledby="text-editor-section">
          <TextEditor
            text={text}
            setText={setText}
            selectedDialectId={selectedDialectId}
            onSynthesize={handleSynthesize}
            isSynthesizing={isSynthesizing}
            fontSize={fontSize}
          />
        </section>

        {/* 3. Audio Player with Waveform and Download */}
        <section aria-labelledby="audio-player-section">
          <AudioPlayer
            currentAudio={currentAudio}
            onBookmark={handleBookmark}
            isBookmarked={currentAudio ? bookmarkedIds.includes(currentAudio.id) : false}
            fontSize={fontSize}
          />
        </section>

        {/* 4. Voice Talent & Synthesis Controls */}
        <section aria-labelledby="voice-settings-section">
          <VoiceSettings
            selectedVoiceId={selectedVoiceId}
            onSelectVoice={setSelectedVoiceId}
            speakingRate={speakingRate}
            setSpeakingRate={setSpeakingRate}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            ttsModel={ttsModel}
            setTtsModel={setTtsModel}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/80 py-6 mt-12 text-xs text-stone-500 text-center space-y-1">
        <p className="font-malayalam font-bold text-stone-700">
          ധ്വനി (Dhwani) — സമഗ്ര മലയാളം പ്രാദേശിക സംഭാഷണ ആപ്പ്
        </p>
        <p>
          High-Fidelity Malayalam Text-to-Speech & Dialect Studio • Powered by Google Gemini 2.5 Pro TTS
        </p>
      </footer>

      {/* Modals & Drawers */}
      <DialectGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectPhrase={(phrase, dialectId) => {
          setText(phrase);
          setSelectedDialectId(dialectId);
        }}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectAudio={setCurrentAudio}
        onClearHistory={() => setHistory([])}
        onRemoveItem={(id) => setHistory((prev) => prev.filter((item) => item.id !== id))}
      />
    </div>
  );
}
