import React from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-blue-100 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800 shadow-sm">
      <div className="max-w-screen-md mx-auto w-full px-4 py-4 flex justify-between items-center">
        <div>
          <a
            href="/"
            className="text-2xl font-bold text-blue-800 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-300 transition"
          >
            🌤️ Weatherify
          </a>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Live Weather · Smart Search
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="bg-white dark:bg-blue-900 text-sm px-3 py-1 rounded shadow hover:bg-blue-50 dark:hover:bg-blue-800 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
};

export default Header;
