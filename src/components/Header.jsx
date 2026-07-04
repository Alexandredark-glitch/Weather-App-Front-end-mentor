import { useState } from 'react';
import useSelectedUnitsStore from '../Services/zustand';
import Logo from '../assets/images/logo.svg';
import settingsIcon from '../assets/images/icon-units.svg';
import dropdownIcon from '../assets/images/icon-dropdown.svg';
import checkedIcon from '../assets/images/icon-checkmark.svg';
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMetric = useSelectedUnitsStore((state) => state.isMetric);
  const toggleMetric = useSelectedUnitsStore((state) => state.toggleMetric);

  return (
    <header className="flex justify-between items-center py-6 mt-6 mb-10">
      <div className="flex items-center gap-3">
        <img className='w-40 md:w-full' src={Logo} alt="logo"></img>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onBlur={ () => setTimeout(() => setIsDropdownOpen(false), 200)}
          className="focus:outline-none focus:ring-2 focus:ring-neutral-0 cursor-pointer flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <img src={settingsIcon} alt='settings icon'/> Units <img src={dropdownIcon} alt='settings icon'/>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full w-56 mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-2 border-b border-neutral-700">
              <button onClick={() => {
                toggleMetric();
                setIsDropdownOpen(false)
              }} className="p-2 w-full hover:bg-neutral-700 text-left outline-none focus-within:ring  text-neutral-0 font-medium cursor-pointer disabled:cursor-not-allowed rounded-md">{isMetric ? 'Switch to Imperial' : 'Switch to Metric'}</button>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-neutral-300 block p-2">Temperature</label>
                  <div className="rounded-lg overflow-hidden">
                    <h2 className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${isMetric ? 'bg-neutral-700' : ''}`} >
                      <span>Celsius °</span>
                      {isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </h2>
                    <h2 className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!isMetric ? 'bg-neutral-700' : ''}`} >
                      <span>Fahrenheit (°F)</span>
                     {!isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </h2>
                  </div>
                </div>
               <hr className='border border-neutral-600'></hr>
                <div>
                  <label className="text-sm text-neutral-300 p-1 block">Wind Speed</label>
                  <div className="bg-neutral-800 rounded-lg overflow-hidden">
                   <h2 className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${isMetric ? 'bg-neutral-700' : ''}`} >
                      <span>km/h</span>
                      { isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </h2>
                    <h2  className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!isMetric ? 'bg-neutral-700' : ''}`} >
                      <span>mph</span>
                      {!isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                    </h2>
                  </div>
                </div>
              <hr className='border border-neutral-600'></hr>
                <div>
                  <label className="text-sm text-neutral-300 p-2 block">Precipitation</label>
                  <div className="bg-neutral-800 rounded-lg overflow-hidden">
                    
                    <div >
                        <h2 className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${isMetric ? 'bg-neutral-700' : ''}`} >
                            <span>Millimeters (mm)</span>
                           { isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                        </h2>
                        <h2  className={`cursor-pointer w-full flex justify-between items-center px-3 py-2 text-sm ${!isMetric ? 'bg-neutral-700' : ''}`} >
                            <span>Inches (in)</span>
                           {!isMetric ? <img src={checkedIcon} alt='checked icon'/> : null}
                        </h2>
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