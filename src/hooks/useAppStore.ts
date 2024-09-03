import {create} from "zustand";

const useAppStore = create<AppState & Action>()((set) => ({
    userId: 0,
    tokens: 0,
    energy: 0,
    infiniteEnergy: false,
    updateUserId: (userId) => set(() => ({ userId: userId })),
    updateTokens: (tokens) => set(() => ({ tokens: tokens })),
    updateEnergy: (energy) => set(() => ({ energy: energy })),
    updateInfiniteEnergy: (infiniteEnergy) => set(() => ({ infiniteEnergy: infiniteEnergy })),
    decreaseEnergy: (by) => set((state) => ({ energy: state.energy - by })),
    increaseEnergy: (by) => set((state) => ({ energy: state.energy + by })),
}))

interface AppState {
    userId: number
    tokens: number
    energy: number
    infiniteEnergy: boolean
}

type Action = {
    updateUserId: (userId: AppState['userId']) => void
    updateTokens: (tokens: AppState['tokens']) => void
    updateEnergy: (energy: AppState['energy']) => void
    updateInfiniteEnergy: (infiniteEnergy: AppState['infiniteEnergy']) => void
    decreaseEnergy: (by: number) => void
    increaseEnergy: (by: number) => void
}


export default useAppStore