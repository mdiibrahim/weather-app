import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="  border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-screen-md mx-auto w-full px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <p className="flex justify-center items-center gap-1 flex-wrap">
          Designed & built with ❤️ by{" "}
          <a
            href="https://github.com/mohammadibrahim-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Mohammad Ibrahim
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.094 3.292 9.402 7.865 10.939.574.105.785-.25.785-.557 0-.275-.01-1.002-.015-1.967-3.201.696-3.877-1.542-3.877-1.542-.523-1.33-1.277-1.683-1.277-1.683-1.045-.715.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.028 1.76 2.699 1.252 3.356.958.105-.744.402-1.252.732-1.54-2.553-.291-5.238-1.276-5.238-5.682 0-1.255.453-2.28 1.188-3.084-.119-.291-.515-1.464.114-3.05 0 0 .97-.31 3.176 1.181.922-.256 1.91-.384 2.894-.389.983.005 1.97.133 2.894.389 2.205-1.491 3.173-1.181 3.173-1.181.631 1.586.235 2.759.116 3.05.738.804 1.187 1.829 1.187 3.084 0 4.417-2.689 5.387-5.252 5.672.413.354.78 1.051.78 2.12 0 1.53-.014 2.763-.014 3.136 0 .31.208.667.79.554C20.208 21.397 23.5 17.092 23.5 12 23.5 5.648 18.352.5 12 .5z" />
            </svg>
          </a>
        </p>
        <p>Powered by OpenWeatherMap & GeoDB Cities</p>
      </div>
    </footer>
  );
};

export default Footer;
