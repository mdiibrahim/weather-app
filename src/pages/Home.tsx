import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchWeather, setCity } from "../store/weatherSlice";
import WeatherCard from "../components/WeatherCard";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);

  const handleSearch = () => {
    if (input.trim() === "") return;
    dispatch(setCity(input));
    dispatch(fetchWeather(input));
    setInput(""); // Clear input after search
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🌤️ Weather App</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border rounded-md w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && <WeatherCard data={data} />}
    </div>
  );
};

export default Home;
