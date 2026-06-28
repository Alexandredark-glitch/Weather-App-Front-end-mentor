import {getWeatherIcon} from "../Services/weatherCodes";
export default function DailyForecast({ Daily }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Daily forecast</h3>
      <div className="flex gap-4 flex-wrap pb-4 lg:flex-nowrap">
        {Daily.map((item, idx) => (
          <div key={idx + item.day} className="bg-neutral-800 rounded-2xl p-4 flex flex-col items-center">
            <span className="text-neutral-200 text-sm mb-4">{item.day}</span>
            <div className="text-2xl mb-6">
              <img className="w-15 lg:w-20" src={getWeatherIcon(item.code)} alt="weather icon"></img>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-neutral-0">{Math.round(item.tempHigh)}°</span>
              <span className="text-neutral-300">{Math.round(item.tempLow)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}