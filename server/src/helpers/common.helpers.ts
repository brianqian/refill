export function wrap<T>(fn: () => T): T {
  return fn();
}
