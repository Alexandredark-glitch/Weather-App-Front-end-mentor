import { useState, useEffect, useRef } from 'react';
import { searchPlaces } from '../Services/weatherData';
import Loading from '../../assets/images/icon-loading.svg';
import SearchIcon from '../../assets/images/icon-search.svg';
export default function SearchSection({InputValue, Setter, HandleSearch}) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
      if (!InputValue.trim() || InputValue.length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
     setIsSearching(true);
    const fetchSuggestions = async () => {
    try {
      const suggestions = await searchPlaces(InputValue);
     
      setSuggestions(suggestions);
      
      }
      catch (error) {
        console.log("Look here:", error);
      }
      finally {
        setIsSearching(false);
      }
    }
    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 1000)
    return () => clearTimeout(debounce);
  }, [InputValue]);

  return (
  <form>
    <div className=" flex flex-wrap flex-col items-center mb-12 relative z-40">
      <h1 className="mb-18 font-bricolage-grotesque text-5xl md:text-6xl font-bold text-center">
        How's the sky looking today?
      </h1>
      
      <div className=" lg:mr-4 flex flex-col sm:flex-row w-full max-w-2xl gap-6 relative">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300">
            <img src={SearchIcon} alt="Search Icon"></img>
            </div>
            
            <input
              ref={inputRef}
            type="text" 
            placeholder="Search for a place..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={(e) => Setter(e.target.value)}
            value={InputValue}
            className="w-full focus-within:ring-neutral-0 hover:bg-neutral-700 transition-colors ease-in-out duration-500 cursor-pointer bg-neutral-800 placeholder:text-neutral-0 text-neutral-0 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 "
          />
          
         {(InputValue.length >= 3) && isFocused ? (
            <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-700 rounded-xl shadow-xl overflow-hidden z-50">
              
              {/* State 1: Searching */}
              {isSearching && (
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 border-b border-neutral-700/50">
                  <img src={Loading} alt="Loading" className="animate-spin"></img>
                    <span>Search in progress...</span>
                </div>
              )}

              {/* State 2: Found Results */}
              {!isSearching && suggestions.length > 0 && (
                suggestions.map((city, idx) => (
                  <div 
                    onClick={() => {
                      Setter(city.name + ", " + city.country);
                      inputRef.current.focus();
                    }}
                    key={idx}
                     className={`px-4 py-3 text-neutral-200 cursor-pointer transition-colors border-b border-neutral-700 last:border-0 text-lg ${
                      idx === 0 
                        ? 'bg-neutral-700 hover:bg-neutral-500' 
                        : 'bg-neutral-800 hover:bg-neutral-600'
                    }`}
                  >
                    {city?.name}, {city?.country}
                  </div>
                ))
              )}

            </div>
          ) : null}
        </div>
        
        <button onClick={HandleSearch} className="focus:outline-none focus:ring-2 focus-within:ring-blue-700 bg-blue-500 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-colors cursor-pointer">
          Search  
        </button>
      </div>
      </div>
  </form>
  );
}

 

 