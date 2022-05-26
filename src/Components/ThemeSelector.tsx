import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from '../Hooks/useTheme';

export function ThemeSelector() {
  const [theme, setTheme] = useTheme();

  function onThemeSelectorClick() {
    setTheme();
  }

  return (
    <>
      <button onClick={onThemeSelectorClick} className="smooth">
        {(theme === 'dark') ? <SunIcon className="w-5"/> : <MoonIcon className="w-5"/>}
      </button>
    </>
  );
}
