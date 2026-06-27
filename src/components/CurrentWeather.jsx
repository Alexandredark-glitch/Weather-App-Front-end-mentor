export default function CurrentWeather({city, country, temp, date}) {
  return (
    <div className="my-bg min-h-40 lg:min-h-60 flex items-center justify-between rounded-2xl p-6"> 
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold text-neutral-0 mb-2">{city}, {country}</h2>
        <p className="text-neutral-0 text-sm">{date}</p>
      </div>
      <div className="flex items-center gap-5 lg:gap-10 p-6">
       <h1 className="text-sm">A+</h1>
       <h1 className="text-4xl lg:text-8xl font-semibold font-bricolage-grotesque"><i>{Math.round(temp)}°</i></h1>
      </div>
    </div>
  );
}