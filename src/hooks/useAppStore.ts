import {create} from "zustand";
import {ENERGY_TO_INCREASE, MAX_ENERGY} from "../constants/constants.ts";

const useAppStore = create<AppState & Action>()((set) => ({
    tokens: 0,
    energy: MAX_ENERGY,
    updateTokens: (tokens) => set(() => ({ tokens: tokens })),
    updateEnergy: (energy) => set(() => ({ energy: energy })),
    decreaseEnergy: (by) => set((state) => ({ energy: state.energy - by })),
    increaseEnergy: (by) => set((state) => ({ energy: state.energy + by })),
}))

interface AppState {
    tokens: number
    energy: number
}

type Action = {
    updateTokens: (tokens: AppState['tokens']) => void
    updateEnergy: (energy: AppState['energy']) => void
    decreaseEnergy: (by: number) => void
    increaseEnergy: (by: number) => void
}


export default useAppStore