export function arrayIncludes<T = any>(array: T[], item: T): boolean {
  for (let i=0; i<array.length; i++) {
    if (array[i] === item)
      return true;
  }
  return false;
}
