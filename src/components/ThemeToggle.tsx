import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative p-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
        <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;