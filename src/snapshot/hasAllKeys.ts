
export function hasAllKeys<T>(object: Partial<T>, keys: string[]): object is T {
  return keys.every((key) => key in object);
}

//this function only checks if keys are missing, not if there are any additional keys.
