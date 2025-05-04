import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExejczam03MmV3cnZ1Y2hmcnFlMnhlazl0NXdpODFxdndraHozNmRyaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S4LEKuMr2Uco/giphy.gif"
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen bg-gray-100/60 dark:bg-gray-900/60 text-gray-900 dark:text-white transition-colors">
        {/* Header */}
        <div className="w-full border-b border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-950">
          <div className="max-w-screen-md mx-auto w-full px-4">
            <Header
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-screen-md px-4">
            <Home />
          </div>
        </main>

        {/* Footer */}
        <div className="w-full border-t border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <div className="max-w-screen-md mx-auto w-full px-4">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
