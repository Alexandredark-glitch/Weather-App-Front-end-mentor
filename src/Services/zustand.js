import { create } from 'zustand';

const useSelectedUnitsStore = create((set) => ({
    isSelectedDegree: true,
    isSelectedWind: true,
    isSelectedPrecipitation: true,

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


