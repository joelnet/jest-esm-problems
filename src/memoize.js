import mem from "mem";

const maxAge = 1000 * 60 * 60 * 24; // 24 hours

export function memoize(fn) {
  return mem(fn, { maxAge });
}
