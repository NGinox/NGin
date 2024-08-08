import {create} from "zustand";
import {MAX_ENERGY} from "../constants/constants.ts";

const useAppStore = create<AppState & Action>()((set) => ({
    userId: 0,
    tokens: 0,
    energy: MAX_ENERGY,
    updateUserId: (userId) => set(() => ({ userId: userId })),
    updateTokens: (tokens) => set(() => ({ tokens: tokens })),
    updateEnergy: (energy) => set(() => ({ energy: energy })),
    decreaseEnergy: (by) => set((state) => ({ energy: state.energy - by })),
    increaseEnergy: (by) => set((state) => ({ energy: state.energy + by })),
}))

interface AppState {
    userId: number
    tokens: number
    energy: number
}

type Action = {
    updateUserId: (userId: AppState['userId']) => void
    updateTokens: (tokens: AppState['tokens']) => void
    updateEnergy: (energy: AppState['energy']) => void
    decreaseEnergy: (by: number) => void
    increaseEnergy: (by: number) => void
}


export default useAppStore