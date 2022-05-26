type useLocalStorageType = [(key: string) => string | null, (key: string, value: string) => void];

export function useLocalstorage(): useLocalStorageType {

  const getValue = (key: string): string | null => {
    return localStorage.getItem(key);
  }

  const setValue = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  }

  return [getValue, setValue];
}
