import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ApiError from "./components/ApiError"

import WeatherSkeleton from "./components/LoadingSkeleton"; 
import { useState, useEffect } from "react";
import { getWeather } from "./Services/weatherData";
import useSelectedUnitsStore from "./Services/zustand";


function App() {
  const [special, setSpecial] = useState(0);
  const [activeCity, setActiveCity] = useState("Berlin");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentInputText, setCurrentText] = useState("");
  const [date] = useState(new Date());

  const { isSelectedDegree, isSelectedWind, isSelectedPrecipitation } = useSelectedUnitsStore(); // Thanks to Zustand

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const firstWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const weatherData = await getWeather(activeCity, isSelectedDegree, isSelectedWind, isSelectedPrecipitation);
        setData(weatherData);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    firstWeather();
  }, [activeCity, isSelectedDegree, isSelectedWind, isSelectedPrecipitation, special]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!currentInputText.trim()) return;

    setActiveCity(currentInputText);
    setCurrentText("");
  };

  // Safe mapping guards
  const daily = data?.daily?.time ? data.daily.time.map((date, i) => ({
    day: new Date(date + "T00:00").toLocaleDateString("en-US", { weekday: "short" }),
    tempHigh: data.daily.temperature_2m_max[i],
    tempLow: data.daily.temperature_2m_min[i],
    code: data.daily.weather_code[i],
  })) : [];

  const hourly = data?.hourly?.time ? data.hourly.time.map((time, i) => {
    const [date, hour] = time.split("T");
    const hours = Number(hour.split(":")[0]);
    const h12 = hours % 12 || 12;
    const ampm = hour < 12 ? "AM" : "PM";
    return {
      date,
      hours,
      label: `${h12} ${ampm}`,
      temp: Math.round(data.hourly.temperature_2m[i]),
      code: data.hourly.weather_code[i],
    };
  }) : [];

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setSpecial((prev) => prev + 1);
  }
 
  if (error === "Network error — please check your connection" || 
  error === "Failed to reach the location service"  

 ) {
  return (
    <div className="bg-neutral-900 text-neutral-0 px-6 pb-12 font-sans overflow-x-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header/>
        <ApiError onRetry={handleRetry}/>
      </div>
    </div>
   
  );
}


  return (
    <div className="bg-neutral-900 text-neutral-0 px-6 pb-12 font-sans overflow-x-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchSection inputValue={currentInputText} setter={setCurrentText} handleSearch={handleSearch} />

        <div className="mt-6">
          {/* 1. SKELETON SCREEN IS NOW RENDERED HERE */}
          {isLoading && <WeatherSkeleton />}

          {error ==="No results found" && (
            <p className="text-neutral-0 text-lg font-bold text-center">No search results found</p>
          )}
          
          {/*3. SUCCESS DATA STATE */}
          {!isLoading && !error && data && (
            <main className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 max-w-5xl mx-auto">
              <div>
                <CurrentWeather
                  city={data.name}
                  country={data.country}
                  temp={data.current.temperature_2m}
                  date={formattedDate}
                />
                <WeatherDetails
                  feelsLike={data.current.apparent_temperature}
                  humidity={data.current.relative_humidity_2m}
                  wind={data.current.wind_speed_10m}
                  precipitation={data.current.precipitation}
                />
                <DailyForecast daily={daily} />
              </div>

              <div className="w-full lg:w-90 mx-auto">
                <HourlyForecast foreCast={hourly} today={formattedDate.split(",")[0]} />
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;