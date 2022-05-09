import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

export function ThemeSelector() {

  const [theme, setTheme] = useState('');

  useEffect(() => {
    if ( localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  }, []);

  function onThemeSelectorClick() {
    if ( theme === 'dark' ) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    }
  }

  return (
    <>
      <button onClick={onThemeSelectorClick} className="smooth">
        {(theme === 'dark') ? <SunIcon className="w-5"/> : <MoonIcon className="w-5"/>}
      </button>
    </>
  );
}
