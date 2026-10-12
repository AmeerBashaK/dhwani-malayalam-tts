export interface DialectInfo {
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

export const REGIONAL_DIALECTS: DialectInfo[] = [
  {
    id: 'malabar',
    name: 'Malabar / Kozhikode',
    malayalamName: 'മലബാർ / കോഴിക്കോട് ശൈലി',
    region: 'North Kerala (Kozhikode, Malappuram, Kannur)',
    description: 'Famed for warm hospitality, melodic cadence, and rich Mappila Malayalam vocabulary with friendly elongated vowel endings.',
    characteristics: [
      'Polite plural "ഇങ്ങള്" (ingalu) used warmly for singular',
      'Informal vocative "ഓള്" (olu for she/her), "ഓൻ" (on for he/him)',
      'Question ending particles like "-പ്പാ" (enthappa), "-വോ"',
      'Musical, singing intonation with welcoming warmth'
    ],
    vocabularySamples: [
      { standard: 'നിങ്ങൾ (Ningal)', dialect: 'ഇങ്ങള് (Ingalu)', meaning: 'You (warm/polite)' },
      { standard: 'അവൻ / അവൾ', dialect: 'ഓൻ / ഓള് (On / Olu)', meaning: 'He / She' },
      { standard: 'ഭക്ഷണം (Bhakshanam)', dialect: 'തീറ്റ / ചോറ് / നെയ്ച്ചോറ്', meaning: 'Food / Rice meal' },
      { standard: 'വരൂ (Varu)', dialect: 'പോരിൻ / ഇങ്ങട്ട് പോര്', meaning: 'Come in / Welcome' },
      { standard: 'എന്താണ്? (Enthanu?)', dialect: 'എന്തൂട്ടാപ്പാ? / എന്താപ്പാ?', meaning: 'What is it?' }
    ],
    samplePhrases: [
      {
        malayalam: 'ഇങ്ങള് ഇങ്ങട്ട് പോര് കുട്ടാ, നല്ലൊരു സുലൈമാനി കുടിച്ചിട്ട് ബാക്കി വർത്തമാനം പറയാം!',
        transliteration: 'Ingalu ingattu poru kutta, nalloru sulaimani kudichittu baakki varthamanam parayam!',
        english: 'Please come inside dear, let us drink a warm black tea (sulaimani) before chatting further!',
        category: 'Hospitality & Warmth'
      },
      {
        malayalam: 'ഓള് പറഞ്ഞതൊന്നും കാര്യമാക്കണ്ടപ്പാ, അതൊരു തമാശ പറഞ്ഞതാ!',
        transliteration: 'Olu paranjathonnum kaaryamaakkandappa, athoru thamasha paranjatha!',
        english: 'Do not take what she said to heart brother, she was only teasing in jest!',
        category: 'Conversational'
      },
      {
        malayalam: 'കോഴിക്കോട്ടെ ബിരിയാണീടെ മണം അങ്ങ് ദൂരെന്ന് തന്നെ അറിയാം, ഒരു രക്ഷയുമില്ല!',
        transliteration: 'Kozhikkotte biriyaneede manam angu doorennu thanne ariyaam, oru rakshayumilla!',
        english: 'The aroma of Kozhikode biryani carries from miles away, absolutely unmatched!',
        category: 'Culture & Food'
      }
    ],
    ttsStylePrompt: 'A warm, melodic Malayalam speaker with authentic North Kerala (Kozhikode/Malabar) conversational rhythm, slightly elongated friendly vowels, welcoming intonation and natural lively cadence.',
    accentColor: 'emerald'
  },
  {
    id: 'valluvanad',
    name: 'Valluvanadan / Central Kerala',
    malayalamName: 'വള്ളുവനാടൻ ശൈലി',
    region: 'Palakkad, Shoranur, Ottapalam, Malappuram borders',
    description: 'Renowned as the literary cradle of Kerala, characterized by gentle, soft-spoken phrasing, classical courtesy, and melodious intonation.',
    characteristics: [
      'Polite particle "-ട്ടോ" (kettō/tto) and "-ന്നെ" (nne)',
      'Gentle directionals "അങ്ങട്ട്" (angattu) and "ഇങ്ങട്ട്" (ingattu)',
      'Subtle, soft consonant enunciations and soothing pitch',
      'Traditional respectful honorifics and cultural idiom'
    ],
    vocabularySamples: [
      { standard: 'ശരി, കേട്ടോ (Seri, ketto)', dialect: 'അങ്ങനെയാവട്ടെട്ടോ (Anganeyaavattetto)', meaning: 'Alright then, you hear?' },
      { standard: 'അങ്ങോട്ട് പോകുക (Angottu pokuka)', dialect: 'അങ്ങട്ട് ചെല്ല് (Angattu chellu)', meaning: 'Go over there' },
      { standard: 'എന്താണ് കാര്യം? (Enthanu karyam?)', dialect: 'എന്താപ്പോ ഇതിന്റെയൊരു കാര്യം?', meaning: 'What could this matter be now?' },
      { standard: 'കഴിക്കുക (Kazhikkuka)', dialect: 'ഊണ് കഴിക്കൂന്നേ (Oonu kazhikkoonne)', meaning: 'Please partake in the meal' }
    ],
    samplePhrases: [
      {
        malayalam: 'ഭാരതപ്പുഴയുടെ തീരത്തൂടെ നടക്കുമ്പോൾ എന്തൊരു കുളിർമയാണെന്നോ, അതൊരു വല്ലാത്ത അനുഭൂതിയാണ് ട്ടോ!',
        transliteration: 'Bharathappuzhayude theerathoode nadakkumpol enthoru kulirmayaanenno, athoru vallaatha anubhoothiyaanu tto!',
        english: 'Walking along the banks of Bharathappuzha brings such sweet coolness, it is truly a sublime experience, you know!',
        category: 'Literature & Landscape'
      },
      {
        malayalam: 'അങ്ങട്ട് വേഗം ചെന്നോളൂ, അമ്മ കാപ്പിയും പലഹാരവും എടുത്തു വെച്ചിട്ടുണ്ടാവും ട്ടോ.',
        transliteration: 'Angattu vegam chennolu, amma kaappiyum palahaaravum eduthu vechittundaavum tto.',
        english: 'Hurry on inside, mother will have set out coffee and sweet snacks for you.',
        category: 'Gentle Household'
      },
      {
        malayalam: 'ഇതൊക്കെ വെറുതെ പറയുന്നതാണെന്നേ, വലിയ കാര്യമാക്കാനൊന്നുമില്ല കുട്ടാ.',
        transliteration: 'Ithokke veruthe parayunnathananne, valiya kaaryamaakkanonnumilla kutta.',
        english: 'People simply say such things without thought, do not worry yourself over it child.',
        category: 'Reassurance'
      }
    ],
    ttsStylePrompt: 'A soft-spoken, cultured Malayalam speaker with authentic Valluvanad (Palakkad/Ottapalam) classical polite diction, gentle lilting inflection, and peaceful melodious cadence.',
    accentColor: 'amber'
  },
  {
    id: 'travancore',
    name: 'Travancore / Southern Kerala',
    malayalamName: 'തെക്കൻ / തിരുവനന്തപുരം ശൈലി',
    region: 'Thiruvananthapuram, Kollam, Neyyattinkara',
    description: 'Distinguished by rhythmic cadence, unique vocal particles like "എന്തുവാടെ", "പിള്ളേച്ചാ", and crisp colloquial flair.',
    characteristics: [
      'Question particle "എന്തുവാ" (enthuvaa) instead of "എന്താണ്"',
      'Colloquial vocatives "അണ്ണാ" (anna), "പിള്ളേച്ചാ", "-ടേ" (de)',
      'Sharp sentence-ending drops and animated tempo',
      'Distinctive southern vocabulary influenced by coastal and royal traditions'
    ],
    vocabularySamples: [
      { standard: 'എന്താണ്? (Enthanu?)', dialect: 'എന്തുവാടെ? / എന്തുവാ വിശേഷം?', meaning: 'What is up, mate?' },
      { standard: 'ഇവിടെ (Ivide)', dialect: 'ഇഞ്ചേട് / ഇങ്ങാണ്ട് (Injaedu)', meaning: 'Over here' },
      { standard: 'സുഹൃത്ത് / ചേട്ടൻ', dialect: 'അണ്ണൻ / അളിയൻ (Annan / Aliyan)', meaning: 'Brother / Mate' },
      { standard: 'വേഗത്തിൽ (Vegathil)', dialect: 'പെട്ടെന്നങ്ങ് പോരണ്ണാ', meaning: 'Hurry right here brother' }
    ],
    samplePhrases: [
      {
        malayalam: 'അണ്ണാ എന്തുവാടെ ഇത്? കിഴക്കേക്കോട്ടയിൽ നല്ല തിരക്കാണല്ലോ ഇന്ന്, നമ്മക്ക് പത്മനാഭസ്വാമി ക്ഷേത്രത്തിലേക്ക് പോകണ്ടേ?',
        transliteration: 'Anna enthuvaade ithu? Kizhakke kottaiyil nalla thirakkaanalro innu, nammakku Padmanabhaswamy kshethrathilekku pokande?',
        english: 'Brother what is happening here! East Fort is so lively today, shall we head towards Padmanabhaswamy Temple?',
        category: 'City & Banter'
      },
      {
        malayalam: 'ശങ്കരൻ പിള്ളേച്ചാ, ഒരു കട്ടൻ ചായയും രണ്ടു പരിപ്പുവടയും പെട്ടെന്ന് തരൂടേ!',
        transliteration: 'Shankaran Pillaecha, oru kattan chaayayum randu parippuvadayum pettennu tharoode!',
        english: 'Hey Shankara Pillai-cheta, please whip up a strong black tea and two piping hot lentil vadas quickly!',
        category: 'Tea Stall Culture'
      },
      {
        malayalam: 'അവിടെ വെറുതെ നിൽക്കാതെ ഇങ്ങാണ്ട് കേറി വാടെ, നമ്മുക്ക് കാര്യങ്ങൾ പറഞ്ഞു തീർക്കാം.',
        transliteration: 'Avide veruthe nilkkaathe ingaandu keri vaade, nammukku kaaryangal paranju theerkkaam.',
        english: 'Do not just stand out there mate, step right in and let us settle things properly.',
        category: 'Direct Colloquial'
      }
    ],
    ttsStylePrompt: 'An expressive Malayalam speaker with characteristic Southern Kerala (Thiruvananthapuram/Kollam) inflection, rapid lively tempo, distinctive southern lilt, and colloquial confidence.',
    accentColor: 'indigo'
  },
  {
    id: 'thrissur',
    name: 'Thrissur Slang',
    malayalamName: 'തൃശ്ശൂർ ഗഡി ശൈലി',
    region: 'Thrissur (Cultural Capital)',
    description: 'Punchy, humorous, rapid-fire speech famous across Malayalam cinema and cultural festivals, celebrated for the friendly address "ഗഡീ" (Gadi).',
    characteristics: [
      'Universal term of endearment "ഗഡീ" (Gadi - mate/pal/bro)',
      'Interrogative "എന്തൂട്ടാ" (Enthoottā) and exclamation "പിന്നെന്താ!"',
      'Energetic, staccato delivery with rhythmic pauses',
      'High-spirited humor and vivid conversational slang'
    ],
    vocabularySamples: [
      { standard: 'കൂട്ടുകാരൻ (Koottukaran)', dialect: 'ഗഡി (Gadi)', meaning: 'Mate / Buddy' },
      { standard: 'എന്താണ്? (Enthanu?)', dialect: 'എന്തൂട്ടാ ഇത്? (Enthoottā ithu?)', meaning: 'What on earth is this?' },
      { standard: 'തീർച്ചയായും (Theerchayayum)', dialect: 'പിന്നെന്താ! വേറെ ലെവൽ!', meaning: 'Of course! Next level!' },
      { standard: 'നന്നായിട്ടുണ്ട് (Nannayittundu)', dialect: 'ഒരു രക്ഷയുമില്ല! കട്ട പൊളി!', meaning: 'Incredible! Pure fire!' }
    ],
    samplePhrases: [
      {
        malayalam: 'എന്തൂട്ടാ ഗഡീ ഈ പറയണേ? തൃശ്ശൂർ പൂരത്തിന്റെ ഇലഞ്ഞിത്തറ മേളം കേട്ടിട്ടില്ലെങ്കിൽ പിന്നെന്താ ജീവിതം!',
        transliteration: 'Enthoottā gadee ee parayane? Thrissur Poorathinte Ilanjithara Melam kettittillengil pinnentha jeevitham!',
        english: 'What are you saying my friend! If you have not witnessed the thunderous Ilanjithara Melam at Thrissur Pooram, what else is life!',
        category: 'Thrissur Pooram Excitement'
      },
      {
        malayalam: 'റൗണ്ടിൽ പോയിട്ട് ഒരു കോഫീ കുടിച്ച് വരാം കുട്ടാ, ഒരു രക്ഷയുമില്ലാത്ത വൈബാണ് ഇന്ന്!',
        transliteration: 'Round-il poyittu oru coffee kudichu varaam kutta, oru rakshayumillaatha vibe aanu innu!',
        english: 'Let us take a spin around the Thrissur Round and grab a coffee pal, the vibe tonight is unstoppable!',
        category: 'City Life'
      },
      {
        malayalam: 'അങ്ങേര് പറഞ്ഞത് കേട്ട് ചിരിച്ചു ചിരിച്ചു മണ്ണുകപ്പി ഗഡീ!',
        transliteration: 'Angeru paranjathu kettu chirichu chirichu mannukappi gadee!',
        english: 'Hearing what that fellow said, I literally burst into stitches laughing mate!',
        category: 'Humor & Slang'
      }
    ],
    ttsStylePrompt: 'An enthusiastic, punchy Malayalam speaker with rapid, spirited Thrissur dialect cadence, vibrant energetic delivery, friendly punch, and joyful rhythm.',
    accentColor: 'rose'
  },
  {
    id: 'kottayam',
    name: 'Kottayam / Central Travancore',
    malayalamName: 'കോട്ടയം / അച്ചായൻ ശൈലി',
    region: 'Kottayam, Pala, Changanassery, High Ranges',
    description: 'Warm, resonant Central Travancore dialect famed for plantation culture, classic "അച്ചായൻ" banter, and welcoming idioms.',
    characteristics: [
      'Question phrasing "എന്നാ ഉണ്ടെടോ?" (Enna undedo?)',
      'Affectionate vocative "കൊച്ചേ" (kocche) and "ഇച്ചായൻ / ചേട്ടൻ"',
      'Resonant, clear vowel pronunciation with measured cadence',
      'Distinctive phrasing like "കർത്താവേ", "അങ്ങനെയങ്ങ്"'
    ],
    vocabularySamples: [
      { standard: 'എന്തുണ്ട് വിശേഷം?', dialect: 'എന്നാ ഉണ്ടെടോ കൊച്ചേ?', meaning: 'What is up, child/dear?' },
      { standard: 'ശരിയാണ് (Seriyanu)', dialect: 'അത് സത്യമാ കേട്ടോ (Athu sathyama ketto)', meaning: 'That is truly correct' },
      { standard: 'പോകാം (Pokaam)', dialect: 'എന്നാൽ നമുക്ക് വെച്ചുപിടിക്കാം', meaning: 'Let us set off right away' },
      { standard: 'നല്ലതാണ് (Nallathanu)', dialect: 'സംഗതി കൊള്ളാമല്ലോ!', meaning: 'This thing is quite splendid!' }
    ],
    samplePhrases: [
      {
        malayalam: 'എന്നാ ഉണ്ടെടോ കൊച്ചേ വിശേഷം? മീനച്ചിലാറ്റിലെ കുളിയും കഴിഞ്ഞു നല്ല ചൂട് കാപ്പിയും കുടിക്കാൻ എന്ത് രസമാ!',
        transliteration: 'Enna undedo kocche vishesham? Meenachilaattile kuliyum kazhinju nalla choodu kaappiyum kudikkan enthu rasama!',
        english: 'How goes it my dear? After a dip in the Meenachil river, sipping piping hot coffee is pure bliss!',
        category: 'Meenachil Charm'
      },
      {
        malayalam: 'ഇച്ചായൻ പള്ളിയിൽ പോയിട്ടു വരുമ്പോൾ നല്ല റബ്ബർ തോട്ടത്തിലെ കിളികളുടെ പാട്ടും കേൾക്കാം.',
        transliteration: 'Icchayan palliyil poyittu varumpol nalla rubber thottathile kilikalude paattum kelkkam.',
        english: 'When big brother returns from church, you can hear birds singing across lush rubber plantations.',
        category: 'High Range Serenity'
      }
    ],
    ttsStylePrompt: 'A warm, resonant Central Kerala (Kottayam/High Range) Malayalam speaker with distinctive friendly inflections, clear melodic voice, and welcoming pastoral cadence.',
    accentColor: 'teal'
  },
  {
    id: 'kasaragod',
    name: 'Kasaragod / North Malabar',
    malayalamName: 'കാസർഗോഡ് ശൈലി',
    region: 'Kasaragod & Tuluva borderland',
    description: 'Fascinating northernmost dialect with rich coastal linguistic influences, quick cadence, and unique local vocabulary.',
    characteristics: [
      'Unique pronoun "ഇയെന്താ" (Iyentha) for "What are you doing"',
      'Colloquial verb forms like "പോവുണ്ട്" (povundu)',
      'Unique loanwords and brisk border cadence',
      'Brisk, musical northern delivery'
    ],
    vocabularySamples: [
      { standard: 'നീ എന്തു ചെയ്യുന്നു?', dialect: 'ഇയെന്താ ചെയ്യുന്ന്? (Iyentha cheyyunnu?)', meaning: 'What are you doing?' },
      { standard: 'പോകുന്നു (Pokunnu)', dialect: 'പോവുണ്ട് (Povundu)', meaning: 'Going' },
      { standard: 'അവിടെയുണ്ടോ?', dialect: 'അയിണ്ടോ അവിടെ? (Ayindo avide?)', meaning: 'Is it there?' }
    ],
    samplePhrases: [
      {
        malayalam: 'ബേക്കൽ കോട്ടേടെ മുകളിൽ കയറി നോക്കുമ്പോൾ അറബിക്കടലിന്റെ ഭംഗി കാണാൻ എന്ത് രസമാണെന്നോ!',
        transliteration: 'Bekal kottede mukalil keri nokkumpol Arabikkadalinte bhangi kaanaan enthu rasamaanenno!',
        english: 'Standing atop Bekal Fort and gazing upon the Arabian Sea is such a breathless sight!',
        category: 'Bekal Heritage'
      },
      {
        malayalam: 'ഇയെന്താ കുട്ടാ അവിടെ നോക്കി നിക്കുന്നത്? ഇങ്ങോട്ട് വേഗം വാ!',
        transliteration: 'Iyentha kutta avide nokki nikkunnathu? Ingottu vegam vaa!',
        english: 'What are you gazing at over there young one? Come over here quickly!',
        category: 'Colloquial Prompt'
      }
    ],
    ttsStylePrompt: 'A brisk, distinctive North Malabar Malayalam speaker with authentic Kasaragod northern accent, quick rhythmic tonality, and melodic coastal warmth.',
    accentColor: 'cyan'
  },
  {
    id: 'standard',
    name: 'Standard Malayalam (Akashavani)',
    malayalamName: 'ശുദ്ധമലയാളം / ആകാശവാണി ശൈലി',
    region: 'Universal Kerala / Broadcast Standard',
    description: 'Classical, pristine literary enunciation matching Akashavani (All India Radio) and formal broadcast Malayalam with crystal-clear articulation.',
    characteristics: [
      'Pure literary pronunciation of chillu letters and conjuncts (കൂട്ടക്ഷരങ്ങൾ)',
      'Even, graceful, neutral cadence without regional slang',
      'Articulate pacing suitable for news, narration, literature, and educational content',
      'Authoritative yet pleasant and accessible'
    ],
    vocabularySamples: [
      { standard: 'നമസ്കാരം (Namaskaram)', dialect: 'നമസ്കാരം, സുപ്രഭാതം', meaning: 'Greetings, Good morning' },
      { standard: 'വിശേഷങ്ങൾ (Visheshangal)', dialect: 'വാർത്തകൾ വിശദമായി കേൾക്കാം', meaning: 'Here is the detailed report' },
      { standard: 'നന്ദി (Nandi)', dialect: 'ഏവർക്കും ഹൃദ്യമായ നന്ദി', meaning: 'Heartfelt thanks to everyone' }
    ],
    samplePhrases: [
      {
        malayalam: 'നമസ്കാരം, ആകാശവാണി വാർത്തകൾ വായിക്കുന്നത്. ഇന്നത്തെ പ്രധാന വാർത്തകളിലേക്ക് സ്വാഗതം.',
        transliteration: 'Namaskaram, Akashavani vaarthakal vaayikkunnathu. Innathe pradhaana vaarthakalilekku swaagatham.',
        english: 'Greetings, this is the Akashavani news broadcast. Welcome to the headline summary of today.',
        category: 'News Broadcast'
      },
      {
        malayalam: 'സാഹിത്യവും സംസ്കാരവും സമന്വയിക്കുന്ന ദൈവത്തിന്റെ സ്വന്തം നാടായ കേരളത്തിലേക്ക് ഏവർക്കും സ്വാഗതം.',
        transliteration: 'Saahithyavum samskaaravum samanwayikkunna Daivathinte Swantham Naadaaya Keralathilekku eavarkkum swaagatham.',
        english: 'Welcome everyone to Kerala, God\'s Own Country, where literature, art and culture harmoniously unite.',
        category: 'Formal Welcome'
      },
      {
        malayalam: 'മനുഷ്യർ പരസ്പരം സ്നേഹത്തോടും ഐക്യത്തോടും ജീവിക്കുന്നതാണ് ജീവിതത്തിലെ ഏറ്റവും വലിയ സുകൃതം.',
        transliteration: 'Manushyar parasparam snehathodum aikayathodum jeevikkunnathaanu jeevithathile ettavum valiya sukrutham.',
        english: 'Living with love, compassion, and unity toward one another is life\'s highest blessing.',
        category: 'Philosophical & Literary'
      }
    ],
    ttsStylePrompt: 'A pristine, clear Malayalam speaker with formal Akashavani broadcast enunciation, neutral, dignified, crystal-clear consonant articulation, and articulate cadence.',
    accentColor: 'blue'
  }
];

export interface VoicePersona {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  geminiVoice: string; // Puck, Charon, Kore, Fenrir, Zephyr, etc.
  description: string;
  toneTag: string;
}

export const GEMINI_VOICES: VoicePersona[] = [
  {
    id: 'kore',
    name: 'Malavika (മാളവിക)',
    gender: 'Female',
    geminiVoice: 'Kore',
    description: 'Warm, melodious, natural and expressive. Ideal for storytelling, dialogue, and gentle regional cadences.',
    toneTag: 'Melodic & Warm'
  },
  {
    id: 'puck',
    name: 'Madhavan (മാധവൻ)',
    gender: 'Male',
    geminiVoice: 'Puck',
    description: 'Youthful, energetic, friendly, and lively. Perfect for Thrissur slang and vibrant casual chats.',
    toneTag: 'Energetic & Lively'
  },
  {
    id: 'zephyr',
    name: 'Anjali (അഞ്ജലി)',
    gender: 'Female',
    geminiVoice: 'Zephyr',
    description: 'Crystal-clear, articulate, and poised. Excellent for Akashavani broadcasts and formal literature.',
    toneTag: 'Clear & Poised'
  },
  {
    id: 'fenrir',
    name: 'Govindan (ഗോവിന്ദൻ)',
    gender: 'Male',
    geminiVoice: 'Fenrir',
    description: 'Deep, resonant, authoritative and traditional. Superb for Valluvanadan and elder storytelling.',
    toneTag: 'Deep & Resonant'
  },
  {
    id: 'charon',
    name: 'Arun (അരുൺ)',
    gender: 'Male',
    geminiVoice: 'Charon',
    description: 'Calm, grounded, conversational tone with great dynamic range.',
    toneTag: 'Calm & Grounded'
  }
];
