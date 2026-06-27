import { useState } from 'react';
import useSelectedUnitsStore from '../Services/zustand';
import Logo from '../../assets/images/logo.svg';
import settingsIcon from '../../assets/images/icon-units.svg';
import dropdownIcon from '../../assets/images/icon-dropdown.svg';
import checkedIcon from '../../assets/images/icon-checkmark.svg';
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMetric = useSelectedUnitsStore((state) => state.isMetric);
  const toggleMetric = useSelectedUnitsStore((state) => state.toggleMetric);
  const celciusOrFahrenheit = useSelectedUnitsStore((state) => state.isSelectedDegree); // true = celcius, false = fahrenheit
  const toggleTemp = useSelectedUnitsStore((state) => state.toggleDegree);
  const kmhOrMph = useSelectedUnitsStore((state) => state.isSelectedWind); // true = kmh, false = mph
  const toggleWind = useSelectedUnitsStore((state) => state.toggleWind);
  const mmOrInches = useSelectedUnitsStore((state) => state.isSelectedPrecipitation); // true = mm, false = inches
  const togglePrecipitation = useSelectedUnitsStore((state) => state.togglePrecipitation);

  const fallBack = celciusOrFahrenheit && kmhOrMph && mmOrInches;
  const test = !celciusOrFahrenheit && !kmhOrMph && !mmOrInches;
  

  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="logo"></img>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <img src={settingsIcon} alt='settings icon'/> Units <img src={dropdownIcon} alt='settings icon'/>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full w-56 mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-2 border-b border-neutral-700">
              <button disabled={!fallBack && !test} onClick={() => {
                toggleMetric()
                setIsDropdownOpen(false)
              }} className="p-2 w-full text-left outline-none focus-within:ring focus-within:ring-neutral-0 focus-within:rounded-md text-neutral-0 font-medium cursor-pointer disabled:cursor-not-allowed">{fallBack && !test ? 'Switch to Imperial' : 'Switch to Metric'}</button>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-neutral-300 block p-2">Temperature</label>
                  <div className="rounded-lg overflow-hidden">
                    <button onClick={toggleTemp} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${celciusOrFahrenheit ? 'bg-neutral-700' : ''}`} >
                      <span>Celsius °</span>
                      {celciusOrFahrenheit ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </button>
                    <button onClick={toggleTemp} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!celciusOrFahrenheit ? 'bg-neutral-700' : ''}`} >
                      <span>Fahrenheit (°F)</span>
                     {!celciusOrFahrenheit ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </button>
                  </div>
                </div>
               <hr className='border border-neutral-600'></hr>
                <div>
                  <label className="text-sm text-neutral-300 p-1 block">Wind Speed</label>
                  <div className="bg-neutral-800 rounded-lg overflow-hidden">
                   <button onClick={toggleWind} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${kmhOrMph ? 'bg-neutral-700' : ''}`} >
                      <span>km/h</span>
                      { kmhOrMph ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </button>
                    <button onClick={toggleWind} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!kmhOrMph ? 'bg-neutral-700' : ''}`} >
                      <span>mph</span>
                      {!kmhOrMph ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </button>
                  </div>
                </div>
              <hr className='border border-neutral-600'></hr>
                <div>
                  <label className="text-sm text-neutral-300 p-2 block">Precipitation</label>
                  <div className="bg-neutral-800 rounded-lg overflow-hidden">
                    
                    <div >
                        <button onClick={togglePrecipitation} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${mmOrInches ? 'bg-neutral-700' : ''}`} >
                            <span>Millimeters (mm)</span>
                           { mmOrInches ? <img src={checkedIcon} alt='checked icon'/> : null}
                        </button>
                        <button onClick={togglePrecipitation} className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!mmOrInches ? 'bg-neutral-700' : ''}`} >
                            <span>Inches (in)</span>
                           {!mmOrInches ? <img src={checkedIcon} alt='checked icon'/> : null}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}