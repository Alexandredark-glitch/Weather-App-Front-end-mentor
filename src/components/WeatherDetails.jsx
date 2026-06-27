import useSelectedUnitsStore from "../Services/zustand";
export default function WeatherDetails({ feelsLike, humidity, wind, precipitation }) {
  
  const kmhOrMph = useSelectedUnitsStore((state) => state.isSelectedWind); // true = kmh, false = mph
  const mmOrInches = useSelectedUnitsStore((state) => state.isSelectedPrecipitation); // true = mm, false = inches

  const details = [
    { label: 'Feels Like', value: feelsLike, unit:  '°C' },
    { label: 'Humidity', value: humidity, unit: '%' },
    { label: 'Wind', value: wind, unit:  kmhOrMph ? 'km/h' : 'mph' },
    { label: 'Precipitation', value: precipitation, unit: mmOrInches ? 'mm' : 'in' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {details.map((item, idx) => (
        <div key={idx} className="bg-neutral-800 rounded-2xl flex flex-col justify-between p-2">
          <span className="text-neutral-100 text-sm p-2">{item.label}</span>
          <span className="text-2xl text-neutral-50 p-2">{`${Math.round(item.value)} ${item.unit}`}</span>
        </div>
      ))}
    </div>
  );
}