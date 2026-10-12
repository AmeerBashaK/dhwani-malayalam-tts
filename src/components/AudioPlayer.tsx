import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles,
  Share2,
  Music,
  Check,
} from 'lucide-react';
import { AudioGenerationResult } from '../types';

interface AudioPlayerProps {
  currentAudio: AudioGenerationResult | null;
  onBookmark: (item: AudioGenerationResult) => void;
  isBookmarked: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentAudio,
  onBookmark,
  isBookmarked,
  fontSize,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // When audio changes, reset state and load
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      // Auto play on new synthesis if permitted
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [currentAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleDownload = () => {
    if (!currentAudio) return;
    try {
      const byteCharacters = atob(currentAudio.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: currentAudio.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dhwani-${currentAudio.dialectId}-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentAudio) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
          <Music className="w-6 h-6" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-sm font-bold text-stone-800 font-malayalam">
            ശബ്ദ പ്ലെയർ തയ്യാറാണ് (Audio Player Ready)
          </h3>
          <p className="text-xs text-stone-500">
            മലയാളം വാക്യങ്ങൾ ടൈപ്പ് ചെയ്ത് 'ശബ്ദമുണ്ടാക്കുക' ബട്ടൺ അമർത്തുക. പ്രകൃതിദത്തമായ പ്രാദേശിക ശബ്ദം ഇവിടെ കേൾക്കാം.
          </p>
        </div>
      </div>
    );
  }

  const audioSrc = `data:${currentAudio.mimeType || 'audio/wav'};base64,${currentAudio.audioBase64}`;

  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl shadow-lg p-5 sm:p-6 space-y-5 border border-stone-800">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top Meta Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold font-malayalam">
              {currentAudio.dialectName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-medium">
              വോയ്സ്: {currentAudio.voiceName}
            </span>
            <span className="text-[11px] text-stone-400">
              24kHz WAV • Gemini TTS
            </span>
          </div>
          <p
            className={`font-malayalam text-stone-200 line-clamp-2 pt-1 ${
              fontSize === 'xlarge' ? 'text-lg' : fontSize === 'large' ? 'text-base' : 'text-sm'
            }`}
          >
            "{currentAudio.text}"
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onBookmark(currentAudio)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-white border-stone-700'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark to history'}
            aria-label="Bookmark this audio"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-950 transition-colors"
            title="Download 24kHz master audio"
          >
            {downloadSuccess ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
            <span>ഡൗൺലോഡ് (.wav)</span>
          </button>
        </div>
      </div>

      {/* Stylized Waveform Bars Visualizer */}
      <div className="flex items-center gap-1 h-12 px-2 overflow-hidden select-none">
        {Array.from({ length: 42 }).map((_, i) => {
          const progress = duration > 0 ? currentTime / duration : 0;
          const barRatio = i / 42;
          const isPassed = barRatio <= progress;

          // Pseudo wave heights for visual aesthetic
          const baseHeight = [
            18, 30, 48, 65, 80, 50, 32, 60, 90, 75, 40, 25, 55, 85, 95, 60, 35, 70, 80, 45, 20,
            40, 70, 90, 60, 45, 80, 95, 65, 30, 50, 75, 85, 40, 25, 60, 70, 50, 30, 20, 15, 10
          ][i % 42];

          const waveAnimation = isPlaying
            ? `scale-y-[${(Math.sin(i + currentTime * 4) * 0.3 + 0.8).toFixed(2)}]`
            : '';

          return (
            <div
              key={i}
              onClick={() => {
                if (duration > 0 && audioRef.current) {
                  audioRef.current.currentTime = (i / 42) * duration;
                }
              }}
              style={{ height: `${baseHeight}%` }}
              className={`flex-1 rounded-full transition-all duration-150 cursor-pointer ${waveAnimation} ${
                isPassed
                  ? 'bg-emerald-400 shadow-xs shadow-emerald-500/50'
                  : 'bg-stone-700/60 hover:bg-stone-600'
              }`}
            />
          );
        })}
      </div>

      {/* Scrub Bar & Times */}
      <div className="space-y-1.5">
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          aria-label="Audio scrubber"
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls & Playback Rate */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        {/* Play / Replay Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                setIsPlaying(true);
              }
            }}
            className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Replay from start"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Speed multiplier selector */}
        <div className="flex items-center gap-1.5 bg-stone-800/80 p-1 rounded-xl border border-stone-700/70 text-xs">
          <span className="text-[11px] text-stone-400 px-2 font-medium">വേഗത:</span>
          {[0.75, 1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              onClick={() => handleRateChange(speed)}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                playbackRate === speed
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
