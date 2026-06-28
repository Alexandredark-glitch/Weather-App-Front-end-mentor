import { create } from 'zustand';

const useSelectedUnitsStore = create((set) => ({
    isSelectedDegree: true, //true = celcius, false = fahrenheit
    isSelectedWind: true, //true = kmh, false = mph
    isSelectedPrecipitation: true, //true = mm, false = inches

    isMetric: true,

    toggleDegree: () => set((state) => ({ isSelectedDegree: !state.isSelectedDegree })),
    toggleWind: () => set((state) => ({ isSelectedWind: !state.isSelectedWind })),
    togglePrecipitation: () => set((state) => ({ isSelectedPrecipitation: !state.isSelectedPrecipitation })),
   toggleMetric: () => set((state) => ({
        isMetric: !state.isMetric,
       isSelectedDegree: !state.isSelectedDegree,
       isSelectedWind: !state.isSelectedWind,
       isSelectedPrecipitation: !state.isSelectedPrecipitation
    }))
    
        
}));

export default useSelectedUnitsStore


