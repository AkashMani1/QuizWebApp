// ─── OpenTDB API types ────────────────────────────────────────────────────────

export type TriviaApiDifficulty = "easy" | "medium" | "hard";

export interface TriviaApiQuestion {
  type: "multiple";
  difficulty: TriviaApiDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number; // 0 = success, 1 = no results, 2 = invalid param, 5 = rate-limit
  results: TriviaApiQuestion[];
}

// ─── Internal normalised type (used by components) ───────────────────────────

export interface TriviaQuestion {
  id: string;               // stable key for React
  question: string;
  options: string[];        // shuffled: correct + 3 incorrect
  correctIndex: number;     // index of correct answer in options[]
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// ─── HTML-entity decoder (runs entirely client-side, no DOM dependency) ───────

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
  "&laquo;": "«",
  "&raquo;": "»",
  "&ndash;": "–",
  "&mdash;": "—",
  "&hellip;": "…",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
  "&deg;": "°",
  "&frac12;": "½",
  "&frac14;": "¼",
  "&frac34;": "¾",
  "&times;": "×",
  "&divide;": "÷",
  "&plusmn;": "±",
  "&micro;": "µ",
  "&euro;": "€",
  "&pound;": "£",
  "&yen;": "¥",
  "&cent;": "¢",
  "&nbsp;": " ",
  "&iexcl;": "¡",
  "&iquest;": "¿",
  "&Agrave;": "À", "&agrave;": "à",
  "&Aacute;": "Á", "&aacute;": "á",
  "&Acirc;":  "Â", "&acirc;":  "â",
  "&Atilde;": "Ã", "&atilde;": "ã",
  "&Auml;":   "Ä", "&auml;":   "ä",
  "&Aring;":  "Å", "&aring;":  "å",
  "&AElig;":  "Æ", "&aelig;":  "æ",
  "&Ccedil;": "Ç", "&ccedil;": "ç",
  "&Egrave;": "È", "&egrave;": "è",
  "&Eacute;": "É", "&eacute;": "é",
  "&Ecirc;":  "Ê", "&ecirc;":  "ê",
  "&Euml;":   "Ë", "&euml;":   "ë",
  "&Igrave;": "Ì", "&igrave;": "ì",
  "&Iacute;": "Í", "&iacute;": "í",
  "&Icirc;":  "Î", "&icirc;":  "î",
  "&Iuml;":   "Ï", "&iuml;":   "ï",
  "&ETH;":    "Ð", "&eth;":    "ð",
  "&Ntilde;": "Ñ", "&ntilde;": "ñ",
  "&Ograve;": "Ò", "&ograve;": "ò",
  "&Oacute;": "Ó", "&oacute;": "ó",
  "&Ocirc;":  "Ô", "&ocirc;":  "ô",
  "&Otilde;": "Õ", "&otilde;": "õ",
  "&Ouml;":   "Ö", "&ouml;":   "ö",
  "&Oslash;": "Ø", "&oslash;": "ø",
  "&Ugrave;": "Ù", "&ugrave;": "ù",
  "&Uacute;": "Ú", "&uacute;": "ú",
  "&Ucirc;":  "Û", "&ucirc;":  "û",
  "&Uuml;":   "Ü", "&uuml;":   "ü",
  "&Yacute;": "Ý", "&yacute;": "ý",
  "&THORN;":  "Þ", "&thorn;":  "þ",
  "&szlig;":  "ß",
};

/**
 * Decodes HTML entities robustly without relying on DOM innerHTML.
 * Handles both named entities (&amp;) and numeric references (&#160; / &#x00A0;).
 */
export function decodeHTMLEntities(text: string): string {
  // 1. Named entities from the lookup table
  let decoded = text.replace(/&[a-zA-Z]+;/g, (match) => HTML_ENTITIES[match] ?? match);

  // 2. Decimal numeric references  e.g. &#160;
  decoded = decoded.replace(/&#(\d+);/g, (_, code) =>
    String.fromCodePoint(parseInt(code, 10))
  );

  // 3. Hex numeric references  e.g. &#x00A0;
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  );

  return decoded;
}

// ─── Fisher-Yates shuffle ─────────────────────────────────────────────────────

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Normalise raw OpenTDB question → TriviaQuestion ─────────────────────────

function normaliseQuestion(raw: TriviaApiQuestion, idx: number): TriviaQuestion {
  const correct = decodeHTMLEntities(raw.correct_answer);
  const incorrects = raw.incorrect_answers.map(decodeHTMLEntities);

  // Build shuffled options while tracking correct index
  const allOptions = shuffle([correct, ...incorrects]);
  const correctIndex = allOptions.indexOf(correct);

  const diffMap: Record<TriviaApiDifficulty, TriviaQuestion["difficulty"]> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return {
    id: `q-${idx}-${Date.now()}`,
    question: decodeHTMLEntities(raw.question),
    options: allOptions,
    correctIndex,
    category: decodeHTMLEntities(raw.category),
    difficulty: diffMap[raw.difficulty] ?? "Medium",
  };
}

// ─── API error codes ──────────────────────────────────────────────────────────

const RESPONSE_CODE_MESSAGES: Record<number, string> = {
  1: "Not enough questions available for your selection. Try again.",
  2: "Invalid API request parameters.",
  5: "Too many requests — the API is rate-limiting us. Please wait a moment and try again.",
};

// ─── Main fetch function (with retry on transient errors) ─────────────────────

const OPENTDB_URL =
  "https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986";

export async function fetchTriviaQuestions(
  signal?: AbortSignal
): Promise<TriviaQuestion[]> {
  // Append a cache-buster so Next.js doesn't cache the result
  const url = `${OPENTDB_URL}&_t=${Date.now()}`;

  const res = await fetch(url, {
    signal,
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(
      `Network error ${res.status}: ${res.statusText}. Check your connection.`
    );
  }

  const json: TriviaApiResponse = await res.json();

  if (json.response_code !== 0) {
    throw new Error(
      RESPONSE_CODE_MESSAGES[json.response_code] ??
        `Unexpected API response code: ${json.response_code}.`
    );
  }

  if (!json.results?.length) {
    throw new Error("The API returned an empty question set. Please try again.");
  }

  // url3986 encoding means we need to decode URI components first, THEN HTML entities
  return json.results.map((raw, idx) => {
    const decoded: TriviaApiQuestion = {
      ...raw,
      question: decodeURIComponent(raw.question),
      correct_answer: decodeURIComponent(raw.correct_answer),
      incorrect_answers: raw.incorrect_answers.map(decodeURIComponent),
      category: decodeURIComponent(raw.category),
    };
    return normaliseQuestion(decoded, idx);
  });
}
