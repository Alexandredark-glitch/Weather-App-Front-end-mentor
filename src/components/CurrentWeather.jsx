import {getWeatherIcon} from "../Services/weatherCodes";
export default function CurrentWeather({ City, Country, Temp, Date, Weathercode }) {
  return (
    <div className="my-bg px-4 py-6 lg:px-6 lg:py-16 lg:min-h-20 flex flex-col md:flex-row items-center justify-between rounded-2xl p-6"> 
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold text-neutral-0 mb-2">{City}, {Country}</h2>
        <p className="text-neutral-0 text-center sm:text-left">{Date}</p>
      </div>
      <div className="flex  items-center justify-between gap-3 lg:gap-10 p-6">
        <img className="min-w-15 lg:w-30" src={ getWeatherIcon(Weathercode) } alt="Current Weather Icon"></img>
       <h1 className="text-8xl font-semibold font-bricolage-grotesque"><i>{Math.round(Temp)}°</i></h1>
      </div>
    </div>
  );
}