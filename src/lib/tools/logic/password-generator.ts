export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export type PassphraseOptions = {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
};

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

const wordList = [
  "apple", "river", "cloud", "stone", "light", "forest", "ocean", "bridge",
  "silver", "planet", "garden", "castle", "ember", "north", "delta", "coral",
  "maple", "orbit", "spark", "tiger", "velvet", "winter", "yellow", "zenith",
  "anchor", "breeze", "candle", "dragon", "eagle", "falcon", "glacier", "harbor",
];

const randomInt = (max: number): number => {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
};

export const estimatePasswordEntropy = (length: number, poolSize: number): number => {
  if (poolSize <= 0 || length <= 0) return 0;
  return Math.round(length * Math.log2(poolSize));
};

export const generatePassword = (
  options: PasswordOptions,
): { ok: true; password: string; entropy: number } | { ok: false; error: string } => {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  if (!Number.isFinite(length) || length < 8 || length > 128) {
    return { ok: false, error: "Password length must be between 8 and 128." };
  }

  let pool = "";
  if (uppercase) pool += UPPER;
  if (lowercase) pool += LOWER;
  if (numbers) pool += NUMBERS;
  if (symbols) pool += SYMBOLS;

  if (!pool) {
    return { ok: false, error: "Select at least one character type." };
  }

  const chars = Array.from({ length }, () => pool[randomInt(pool.length)]).join("");
  return {
    ok: true,
    password: chars,
    entropy: estimatePasswordEntropy(length, pool.length),
  };
};

export const generatePassphrase = (
  options: PassphraseOptions,
): { ok: true; passphrase: string; entropy: number } | { ok: false; error: string } => {
  const { wordCount, separator, capitalize, includeNumber } = options;

  if (!Number.isFinite(wordCount) || wordCount < 3 || wordCount > 12) {
    return { ok: false, error: "Word count must be between 3 and 12." };
  }

  const words = Array.from({ length: wordCount }, () => {
    let word = wordList[randomInt(wordList.length)];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  if (includeNumber) {
    words.push(String(randomInt(100)));
  }

  const passphrase = words.join(separator);
  const entropy = Math.round(wordCount * Math.log2(wordList.length) + (includeNumber ? 6 : 0));

  return { ok: true, passphrase, entropy };
};
