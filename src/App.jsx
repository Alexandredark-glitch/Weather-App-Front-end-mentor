import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ApiError from "./components/ApiError"

import WeatherSkeleton from "./components/LoadingSkeleton"; 
import { useState, useEffect, useMemo } from "react";
import { getWeather } from "./Services/weatherData";
import useSelectedUnitsStore from "./Services/zustand";

const NETWORK_ERROR_MSG = "Network error — please check your connection";
const LOCATION_ERROR_MSG = "Failed to reach the location service";
const NO_RESULTS_MSG = "No results found";
const formatFullDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatShortDay = (dateStr) =>
  new Date(dateStr + "T00:00").toLocaleDateString("en-US", { weekday: "short" })

function App() {
  const [special, setSpecial] = useState(0);
  const [activeCity, setActiveCity] = useState("Berlin");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentInputText, setCurrentText] = useState("");

  const { isSelectedDegree, isSelectedWind, isSelectedPrecipitation } = useSelectedUnitsStore(); // Thanks to Zustand

  const today = useMemo(() => new Date(), []);
  const formattedDate = useMemo(() => formatFullDate(today), [today]);
 

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;   // used to prevent state updates after unmount
    const firstWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const weatherData = await getWeather(activeCity, isSelectedDegree, isSelectedWind, isSelectedPrecipitation, controller.signal);
        if(!ignore) setData(weatherData);
      } catch (error) {
         if (error.name === 'AbortError') return;
        if (!ignore) setError(error?.message || "An unexpected error occurred");

      } finally {
        if(!ignore) setIsLoading(false);
      }
    };

    firstWeather();

    return () => {
      ignore = true;
      controller.abort();
    }
  }, [activeCity, isSelectedDegree, isSelectedWind, isSelectedPrecipitation, special]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!currentInputText.trim()) return;

    setActiveCity(currentInputText);
    setCurrentText("");
  };

  // Safe mapping guards and Memoized
  
    const daily = useMemo(() => {
    if (!data?.daily?.time) return [];
    return data.daily.time.map((dateStr, i) => ({
      day: formatShortDay(dateStr),
      tempHigh: data.daily.temperature_2m_max[i],
      tempLow: data.daily.temperature_2m_min[i],
      code: data.daily.weather_code[i],
    }));
  }, [data]);

  const hourly =
    useMemo(() => {
      if (!data?.hourly?.time) return [];
    return data.hourly.time.map((time, i) => {
         
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
   });
  }, [data]);
  

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setSpecial((prev) => prev + 1);
  }
 
  if (error === NETWORK_ERROR_MSG || error === LOCATION_ERROR_MSG
 ) {
  return (
    <div className="bg-neutral-900 text-neutral-0 px-6 pb-12 font-sans overflow-x-hidden min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Header/>
        <ApiError onRetry={handleRetry}/>
      </div>
    </div>
   
  );
}


  return (
    <div className="bg-neutral-900 text-neutral-0 px-6 pb-12 font-sans overflow-x-hidden min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Header />
        <SearchSection InputValue={currentInputText} Setter={setCurrentText} HandleSearch={handleSearch} />

        <div className="mt-6">
          {/* 1. SKELETON SCREEN IS NOW RENDERED HERE */}
          {isLoading && <WeatherSkeleton />}

          {!isLoading && error === NO_RESULTS_MSG && (
            <p className="text-neutral-0 text-lg font-bold text-center">No search results found</p>
          )}

          {/* 2.Generic error state */}
            {!isLoading && error && error !== NO_RESULTS_MSG && (
            <div className="text-center">
              <p className="text-red-400 text-lg font-bold">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600"
              >
                Retry
              </button>
            </div>
          )}
          
          {/*3. SUCCESS DATA STATE */}
          {!isLoading && !error && data && (
            <main className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 max-w-6xl mx-auto">
              <div>
                <CurrentWeather
                  City={data?.name}
                  Country={data?.country}
                  Temp={data.current?.temperature_2m}
                  Date={formattedDate}
                  Weathercode={data?.current?.weather_code}
                />
                <WeatherDetails
                  FeelsLike={data.current?.apparent_temperature}
                  Humidity={data.current?.relative_humidity_2m}
                  Wind={data.current?.wind_speed_10m}
                  Precipitation={data?.current.precipitation}
                />
                <DailyForecast Daily={daily} />
              </div>

              <div className="w-full lg:w-90 mx-auto">
                <HourlyForecast ForeCast={hourly} Today={formattedDate.split(",")[0]} />
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;