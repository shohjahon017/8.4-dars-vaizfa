import React, { useState } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  visibility: number;
}

const App: React.FC = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const fetchWeather = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    const API_KEY = "09841b631a6908feaa9545cd3d0ed67d";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios
      .get<WeatherData>(URL)
      .then((response) => {
        setWeather(response.data);
      })
      .catch(() => {
        setError("Joy nomi noto‘g‘ri yoki ma’lumot topilmadi.");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Ob-Havo Ma'lumotlari
        </h1>
        <form onSubmit={fetchWeather} className="flex gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Joy nomini kiriting..."
            className="p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 text-black w-full"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow font-semibold transition"
          >
            <img src="/search.svg" alt="search" className="w-5" />
          </button>
        </form>

        {error && <p className="text-red-300 mt-4 text-center">{error}</p>}

        {weather && (
          <div className="mt-8 bg-white text-black p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <p className="text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="mx-auto"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p>Harorat: {weather.main.temp}°C</p>
                <p>Seziluvchi: {weather.main.feels_like}°C</p>
              </div>
              <div>
                <p>Minimal: {weather.main.temp_min}°C</p>
                <p>Maksimal: {weather.main.temp_max}°C</p>
              </div>
            </div>
            <p className="mt-4">Namlik: {weather.main.humidity}%</p>
            <p>Shamol tezligi: {weather.wind.speed} m/s</p>
            <p>Atmosfera bosimi: {weather.main.pressure} hPa</p>
            <p>Ko'rinish masofasi: {weather.visibility / 1000} km</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
