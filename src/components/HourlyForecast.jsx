import { useState, useMemo } from 'react';
import {getWeatherIcon} from "../Services/weatherCodes"

export default function HourlyForecast({foreCast, today}) {
  const [isDaySelectOpen, setIsDaySelectOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);

   // Object { 
// date: "2026-06-26", hours: 0, label: "12 PM", … }
// date: "2026-06-26"
// hours: 0
// label: "12 PM"​
// temp: 24​

  const getDayName = (dateString) => {
    return new Date(dateString + "T00:00").toLocaleDateString("en-US", { weekday: "long" });
  };

  const availableDays = useMemo(() => {
    const days = foreCast.map(item => getDayName(item.date));
    return [...new Set(days)]; // Removes duplicates
  }, [foreCast]);
  
   const displayData = useMemo(() => {
    let filtered = foreCast.filter(item => getDayName(item.date) === selectedDay);

    filtered = filtered.filter(item => item.hours >= 15 && item.hours <= 22);
    return filtered;
   }, [foreCast, selectedDay]);

  return (
    <div className="bg-[#25253f] rounded-xl p-4  flex flex-col justify-between">
      {/* Header Block */}
      <div className="flex justify-between items-center mb-4 relative">
        <h3 className="text-lg font-semibold text-neutral-0">Hourly forecast</h3>
        
        {/* Dropdown Container */}
        <div className="relative">
          {/* Menu Trigger Button */}
          <button 
            onClick={() => setIsDaySelectOpen(prev => !prev)}
            className="flex items-center gap-2 bg-[#3C3B5C] text-sm font-semibold px-4 py-1 rounded-lg border border-neutral-600/40 transition-colors text-neutral-200"
          >
            <span>{selectedDay}</span>
            <span className=" text-neutral-300">A+</span>
          </button>

          {/* Floating Dropdown Menu */}
          {isDaySelectOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-neutral-700 border border-neutral-600 rounded-lg shadow-xl z-50 overflow-hidden py-1">
              {availableDays.map((day, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setSelectedDay(day);
                    setIsDaySelectOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-neutral-600 ${
                    day === selectedDay ? 'bg-neutral-600 text-neutral-0 font-medium' : 'text-neutral-200'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hourly List with Individual Capsule Rows */}
      <div className="space-y-3 p-2 flex flex-col justify-between">
        {displayData.map((item, idx) => (
          <div 
            key={idx} 
            className="flex border border-neutral-600 items-center justify-between px-4 py-4 bg-[#2F2F49] rounded-lg transition-all hover:bg-neutral-700/40"
          >
            <div className="flex items-center gap-4">
             <img className="w-8 h-8" src={getWeatherIcon(item.code)} alt="weather icon"/>
              <span className=" text-neutral-200 text-lg font-semibold">{item.label}</span>
            </div>
            <span className="text-neutral-0">{item.temp}°</span>
          </div>
        ))}
        {displayData.length === 0 && (
          <p className="text-neutral-400 text-center py-4 text-3xl">No hourly data available.</p>
        )}
      </div>
    </div>
  );
}