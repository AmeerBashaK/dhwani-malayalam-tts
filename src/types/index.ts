export interface DialectItem {
  id: string;
  name: string;
  malayalamName: string;
  region: string;
  description: string;
  characteristics: string[];
  vocabularySamples: { standard: string; dialect: string; meaning: string }[];
  samplePhrases: {
    malayalam: string;
    transliteration: string;
    english: string;
    category: string;
  }[];
  ttsStylePrompt: string;
  accentColor: string;
}

export interface VoiceItem {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  geminiVoice: string;
  description: string;
  toneTag: string;
}

export interface AudioGenerationResult {
  id: string;
  text: string;
  audioBase64: string;
  mimeType: string;
  dialectId: string;
  dialectName: string;
  voiceName: string;
  model: string;
  timestamp: number;
  duration?: number;
  adaptedFrom?: string;
  culturalNote?: string;
}

export interface DialectAdaptationResponse {
  adaptedText: string;
  transliteration?: string;
  phoneticGuide?: string;
  vocabularyChanges?: {
    original: string;
    replacedWith: string;
    explanation: string;
  }[];
  culturalNote?: string;
}
