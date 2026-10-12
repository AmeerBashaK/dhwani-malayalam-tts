# Dhwani — Malayalam TTS

A Malayalam text-to-speech and regional dialect studio built with React, TypeScript, Vite, Tailwind CSS, Express, and the Google Gemini SDK.

## Features

- Seven dialect profiles: Malabar/Kozhikode, Valluvanadan, Travancore, Thrissur, Kottayam, Kasaragod, and Standard Malayalam.
- Malayalam text editing, Manglish transliteration, and AI-assisted dialect adaptation.
- Voice selection, speaking pace, tone controls, and audio playback/download.
- Regional vocabulary and sample phrases.
- Recent audio history and bookmarks stored in browser local storage.

Dialect profiles guide generation through prompts; accuracy and pronunciation depend on the selected Gemini model.

## Local setup

Install Node.js and npm compatible with the dependency versions in `package.json`, and obtain a Gemini API key with access to the configured models.

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env` in the project root.
   - PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
3. Set `GEMINI_API_KEY` in `.env` to your own key.
4. Run `npm run dev`.
5. Open <http://localhost:3000>.

The Express server uses `dotenv.config()`, which reads `.env` by default. `PORT` overrides port 3000. `APP_URL` is an optional AI Studio template setting and is not currently referenced by the application.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Express with Vite development middleware |
| `npm start` | Start the same server; behavior depends on `NODE_ENV` |
| `npm run build` | Build the frontend into `dist/` |
| `npm run lint` | Run TypeScript checking (no separate lint engine) |
| `npm run preview` | Preview the frontend build only; does not provide Express API routes |

## Project layout

- `server.ts`: Gemini-backed synthesis, dialect adaptation, and transliteration endpoints.
- `src/App.tsx`: Main application and browser-local history.
- `src/components/`: Editor, dialect selector, voice controls, player, glossary, and history.
- `src/data/dialects.ts`: Regional profiles, vocabulary, sample phrases, and voices.
- `src/types/`: Shared frontend types.

## API routes

All routes accept JSON via POST:

- `/api/tts/synthesize`: `text`, plus optional dialect, voice, model, style, and pace settings.
- `/api/dialects/adapt`: `text` and `targetDialectId`.
- `/api/transliterate`: `manglishText`.

## Configuration and current limitations

This repository preserves the application code from the supplied AI Studio export. Model identifiers are configured in `server.ts`, `src/App.tsx`, and the voice controls. Their availability and end-to-end speech generation have not been verified. No API key is included.

The production branch in `server.ts` uses `__dirname` in an ES module; review that path handling before production deployment. API routes currently have no authentication or rate limiting. Before hosting publicly, add access controls and request limits to protect the server-side API key and quota. Publishing this source repository does not deploy the application.

Keep `.env`, API keys, credentials, generated builds, and dependencies out of Git. `.gitignore` excludes these common local files while keeping `.env.example` as a safe configuration template.

## License

No repository-wide license file was supplied. Existing source license notices have been preserved; choose an appropriate project license before distributing under specific license terms.

### Import validation

The initial `npm install --ignore-scripts --no-audit --no-fund` failed with `ERESOLVE`: the exported project declares `esbuild ^0.25.0`, while resolved Vite 8.3.4 requires optional peer `esbuild ^0.27.0 || ^0.28.0`. Dependency versions have been preserved from the ZIP. Resolve that dependency mismatch before following the setup commands; build and TypeScript checks could not run during import.
