import React from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-lg rounded-xl p-6 w-full max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      {weather.length > 0 ? (
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          className="mx-auto w-20 h-20 animate-bounce"
        />
      ) : (
        <p className="text-sm text-gray-500">No icon available</p>
      )}

      <p className="text-xl capitalize">{weather[0].description}</p>
      <p className="text-3xl font-bold">{main.temp}°C</p>

      <div className="mt-4 text-sm text-gray-600">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
