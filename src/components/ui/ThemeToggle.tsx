'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="h-5 w-5 text-gray-700" />
      ) : (
        <FiSun className="h-5 w-5 text-yellow-300" />
      )}
    </button>
  );
} 