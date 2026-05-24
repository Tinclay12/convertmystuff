export type UrlStateValue = string | number | boolean;

export type UrlStateMap = Record<string, UrlStateValue>;

const encodeValue = (value: UrlStateValue): string => {
  if (typeof value === "boolean") {
    return value ? "1" : "0";
  }
  return String(value);
};

const decodeValue = (raw: string): UrlStateValue => {
  if (raw === "1" || raw === "true") {
    return true;
  }
  if (raw === "0" || raw === "false") {
    return false;
  }
  const numeric = Number(raw);
  if (raw !== "" && Number.isFinite(numeric)) {
    return numeric;
  }
  return raw;
};

export const parseUrlState = (
  searchParams: URLSearchParams | string,
  allowedKeys: string[],
): UrlStateMap => {
  const params =
    typeof searchParams === "string"
      ? new URLSearchParams(searchParams)
      : searchParams;
  const allowed = new Set(allowedKeys);
  const state: UrlStateMap = {};

  params.forEach((value, key) => {
    if (!allowed.has(key)) {
      return;
    }
    state[key] = decodeValue(value);
  });

  return state;
};

export const buildUrlStateSearch = (state: UrlStateMap): string => {
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) => {
    if (value === "" || value === undefined || value === null) {
      return;
    }
    params.set(key, encodeValue(value));
  });

  const query = params.toString();
  return query ? `?${query}` : "";
};

export const buildShareUrl = (pathname: string, state: UrlStateMap): string => {
  if (typeof window === "undefined") {
    return `${pathname}${buildUrlStateSearch(state)}`;
  }
  const origin = window.location.origin;
  return `${origin}${pathname}${buildUrlStateSearch(state)}`;
};

export const replaceUrlState = (pathname: string, state: UrlStateMap): void => {
  if (typeof window === "undefined") {
    return;
  }
  const nextUrl = `${pathname}${buildUrlStateSearch(state)}`;
  window.history.replaceState(null, "", nextUrl);
};

export const pickUrlState = (
  state: UrlStateMap,
  keys: string[],
): UrlStateMap => {
  const picked: UrlStateMap = {};
  keys.forEach((key) => {
    if (key in state) {
      picked[key] = state[key];
    }
  });
  return picked;
};
