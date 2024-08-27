export interface TapLevel {
    grade: number;
    tokensPerClick: number;
    levelUpgradeCost: number;
}

export interface MaxEnergyLevel {
    grade: number;
    maxEnergy: number;
    levelUpgradeCost: number;
}

export interface Level {
    grade: number;
    value: number;
    levelUpgradeCost: number;
}