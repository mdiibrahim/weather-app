import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchWeather, setCity } from "../store/weatherSlice";
import WeatherCard from "../components/WeatherCard";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    { city: string; country: string }[]
  >([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [history, setHistory] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const suggestionRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("weather-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (city: string) => {
    const updated = [
      city,
      ...history.filter((c) => c.toLowerCase() !== city.toLowerCase()),
    ].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("weather-history", JSON.stringify(updated));
  };

  const removeFromHistory = (cityToRemove: string) => {
    const updated = history.filter((city) => city !== cityToRemove);
    setHistory(updated);
    localStorage.setItem("weather-history", JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!input || input.length < 2) {
        setSuggestions([]);
        return;
      }

      setSuggestionLoading(true);
      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5`,
          {
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_GEODB_API_KEY,
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );

        const json = await res.json();

        if (!json || !json.data) {
          setSuggestions([]);
          return;
        }

        setSuggestions(
          json.data.map((item: any) => ({
            city: item.city,
            country: item.country,
          }))
        );
        setHighlightedIndex(-1);
      } catch (err) {
        console.error("Suggestion error", err);
        setSuggestions([]);
      } finally {
        setSuggestionLoading(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 600); // increased debounce time
    return () => clearTimeout(delay);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      setInput(suggestions[highlightedIndex].city);
      setSuggestions([]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const handleSearch = (city?: string) => {
    const searchCity = city || input.trim();
    if (!searchCity) return;
    dispatch(setCity(searchCity));
    dispatch(fetchWeather(searchCity));
    saveToHistory(searchCity);
    setInput("");
    setSuggestions([]);
  };

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700 transition-all space-y-6 relative">
      <h1 className="text-3xl font-extrabold mb-2 flex justify-center items-center gap-2">
        <span role="img" aria-label="weather">
          ⛅
        </span>{" "}
        Weather App
      </h1>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
        />

        {suggestionLoading && (
          <div className="absolute bg-white dark:bg-gray-800 border w-full mt-1 p-2 text-sm text-gray-500 dark:text-gray-300 rounded shadow z-10">
            Searching...
          </div>
        )}

        {!suggestionLoading && suggestions.length > 0 && (
          <ul
            ref={suggestionRef}
            className="absolute bg-white dark:bg-gray-800 border border-gray-300 w-full mt-1 rounded z-10 shadow max-h-40 overflow-y-auto"
          >
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setInput(item.city);
                  setSuggestions([]);
                }}
                className={`px-4 py-2 cursor-pointer ${
                  index === highlightedIndex
                    ? "bg-blue-100 dark:bg-gray-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {item.city}, {item.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => handleSearch()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition"
      >
        Search
      </button>

      {history.length > 0 && (
        <div className="text-left">
          <p className="font-semibold mb-2">Recent Searches:</p>
          <div className="flex flex-wrap gap-2">
            {history.map((city, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm transition"
              >
                <button
                  onClick={() => handleSearch(city)}
                  className="mr-2 focus:outline-none"
                >
                  {city}
                </button>
                <button
                  onClick={() => removeFromHistory(city)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Remove ${city}`}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="text-blue-600 dark:text-blue-300">Loading...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {data && <WeatherCard data={data} />}
    </div>
  );
};

export default Home;
