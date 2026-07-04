
import dropdownIcon from '../assets/images/icon-dropdown.svg';
export default function WeatherSkeleton() {
  const details = ["Feels Like", "Humidity", "Wind", "Precipitation"];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 max-w-6xl mx-auto">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        {/* 1. Main Current Weather Banner */}
        <div className="bg-neutral-800/60 h-72 rounded-3xl flex flex-col items-center justify-center gap-3 border border-neutral-700/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-neutral-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-neutral-500 rounded-full animate-bounce [animation-delay:-.2s]"></div>
            <div className="w-3 h-3 bg-neutral-500 rounded-full animate-bounce [animation-delay:-.4s]"></div>
          </div>
          <span className="text-neutral-400 text-sm font-medium">Loading...</span>
        </div>

        {/* 2. Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {details.map((label) => (
            <div
              key={label}
              className="bg-neutral-800/60 h-28 rounded-2xl p-4 flex flex-col justify-between border border-neutral-700/30"
            >
              <span className="text-neutral-200 text-sm font-medium">{label}</span>
              <span className="text-neutral-400 text-2xl leading-none">—</span>
            </div>
          ))}
        </div>

        {/* 3. Daily Forecast */}
        <div>
          <h2 className="text-neutral-0 text-lg font-semibold mb-4">Daily forecast</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
            {[...Array(7)].map((_, idx) => (
              <div
                key={idx}
                className="bg-neutral-800/60 h-36 rounded-2xl border border-neutral-700/30"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (Hourly Forecast) */}
      <div className="w-full lg:w-90 bg-neutral-800/60 rounded-3xl p-6 border border-neutral-700/30 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-neutral-0 text-lg font-semibold">Hourly forecast</h2>
          <div className="flex items-center gap-1 bg-neutral-700 text-neutral-300 text-sm px-3 py-1.5 rounded-lg">
            <span>—</span>
           <img src={dropdownIcon} alt='dropdownIcon'></img>
          </div>
        </div>

        {/* Hourly Rows */}
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="bg-neutral-700/20 border border-neutral-700/40 h-14 rounded-xl w-full"
          ></div>
        ))}
      </div>
    </main>
  );
}
