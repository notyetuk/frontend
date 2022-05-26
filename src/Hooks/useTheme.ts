import { useState, useEffect } from "react";
import { useLocalstorage } from "./useLocalstorage";

type useThemeType = [string | null, () => void];

export function useTheme(): useThemeType {
  const [getValue, setValue] = useLocalstorage();

  const [theme, setTheme] = useState(getValue('theme'));

  useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setValue('theme', 'dark');
      setTheme(getValue('theme')!);
      setDocClass('dark');
    } else {
      setValue('theme', 'light');
      setTheme(getValue('theme')!);
      setDocClass('light');
    }
  }, [theme])

  const setDocClass = (c: string): void => {
    if (c === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add(c);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add(c);
    }
  }

  const handleSetTheme = (): void => {
    (theme === 'dark') ? setTheme('light') : setTheme('dark');
  }

  return [theme, handleSetTheme];
}
