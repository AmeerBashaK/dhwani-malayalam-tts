import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { REGIONAL_DIALECTS } from './src/data/dialects';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY environment variable is not set. Gemini API calls will fail.');
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Synthesize Malayalam Speech with Dialect & Voice Control
app.post('/api/tts/synthesize', async (req, res) => {
  try {
    const {
      text,
      dialectId = 'malabar',
      voiceName = 'Kore',
      customStyle,
      model = 'gemini-3.8-flash-tts',
      speakingRate,
    } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for speech synthesis.' });
    }

    const dialect = REGIONAL_DIALECTS.find((d) => d.id === dialectId) || REGIONAL_DIALECTS[0];

    // Build the tailored stylistic prompt for Gemini TTS
    let stylePrompt = customStyle || dialect.ttsStylePrompt;
    if (speakingRate) {
      stylePrompt += ` Speaking pace should be ${speakingRate}.`;
    }

    console.log(`[TTS] Synthesizing speech: Dialect=${dialect.name}, Voice=${voiceName}, Model=${model}`);
    console.log(`[TTS] Prompt style: "${stylePrompt}"`);

    // Primary attempt with selected model (defaults to gemini-3.8-flash-tts)
    const ttsModelsToTry = [model, 'gemini-3.8-flash-lite-tts'].filter(
      (value, index, self) => self.indexOf(value) === index
    );

    let base64Audio: string | undefined;
    let mimeType = 'audio/wav';
    let lastError: any = null;

    for (const currentModel of ttsModelsToTry) {
      try {
        console.log(`[TTS] Attempting synthesis with ${currentModel}...`);
        const response = await ai.models.generateContent({
          model: currentModel,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: text.trim(),
                  speechMetadata: {
                    style: stylePrompt,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
              },
            },
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData?.data) {
          base64Audio = part.inlineData.data;
          mimeType = part.inlineData.mimeType || 'audio/wav';
          console.log(`[TTS] Successfully generated audio using ${currentModel} (size: ${base64Audio.length} chars)`);
          break;
        } else {
          console.warn(`[TTS] No audio inlineData returned from ${currentModel}`);
        }
      } catch (err: any) {
        console.error(`[TTS] Error with ${currentModel}:`, err?.message || err);
        lastError = err;
      }
    }

    if (!base64Audio) {
      const errorMessage = lastError?.message || 'Failed to synthesize speech audio from Gemini API.';
      return res.status(502).json({
        error: errorMessage,
        details: 'The audio synthesis could not be completed with the current configuration.',
      });
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType,
      dialect: dialect.id,
      dialectName: dialect.name,
      voiceName,
      textLength: text.length,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('[TTS] Server exception:', error);
    return res.status(500).json({
      error: error?.message || 'Internal server error while processing speech synthesis.',
    });
  }
});

// Endpoint: Adapt standard Malayalam or Manglish text into regional Kerala dialect
app.post('/api/dialects/adapt', async (req, res) => {
  try {
    const { text, targetDialectId } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for dialect adaptation.' });
    }

    const dialect = REGIONAL_DIALECTS.find((d) => d.id === targetDialectId) || REGIONAL_DIALECTS[0];

    const prompt = `You are an expert Kerala linguist and native Malayalam dialect specialist.
Convert the following user input (which may be standard Malayalam or Manglish) into authentic, natural ${dialect.name} (${dialect.malayalamName}) spoken in Kerala.

Dialect profile:
- Region: ${dialect.region}
- Key characteristics: ${dialect.characteristics.join(', ')}
- Famous regional words/idioms: ${dialect.vocabularySamples.map((v) => `${v.dialect} for ${v.standard}`).join(', ')}

Input text:
"${text.trim()}"

Provide a JSON response with the following exact keys:
{
  "adaptedText": "The text rewritten in natural Malayalam script adhering strictly to ${dialect.name} vocabulary, tone, and regional speech markers.",
  "transliteration": "Clear Manglish / English phonetic transliteration of the adapted text.",
  "phoneticGuide": "Pronunciation tips on word stress, vowel lengthening, intonation, or pitch particular to this dialect.",
  "vocabularyChanges": [
    {
      "original": "standard word",
      "replacedWith": "dialect word",
      "explanation": "why this reflects ${dialect.name}"
    }
  ],
  "culturalNote": "A 1-2 sentence cultural explanation about this dialect's warmth and context."
}

Return ONLY valid JSON. No markdown backticks or commentary outside JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(outputText);
    } catch {
      // Clean possible fences
      const cleaned = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('[Dialect Adapt] Error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to adapt text to regional dialect.',
    });
  }
});

// Endpoint: Convert Manglish (Malayalam written in Latin script) to Malayalam Script
app.post('/api/transliterate', async (req, res) => {
  try {
    const { manglishText } = req.body;
    if (!manglishText || typeof manglishText !== 'string' || !manglishText.trim()) {
      return res.status(400).json({ error: 'Manglish text is required.' });
    }

    const prompt = `Transliterate the following Manglish (Malayalam text written in Roman/English alphabet) into correct, natural Malayalam script Unicode.
Manglish: "${manglishText.trim()}"

Return ONLY JSON:
{
  "malayalamText": "...",
  "normalizedEnglish": "..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      malayalamText: parsed.malayalamText || '',
    });
  } catch (error: any) {
    console.error('[Transliterate] Error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to transliterate Manglish text.',
    });
  }
});

// Mount Vite or serve static frontend
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dhwani Malayalam TTS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
