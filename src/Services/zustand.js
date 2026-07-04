import { create } from 'zustand';

const useSelectedUnitsStore = create((set) => ({
    isMetric: true,
   toggleMetric: () => set((state) => ({
        isMetric: !state.isMetric,
    }))
    
        
}));

export default useSelectedUnitsStore


