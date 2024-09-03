import React from 'react';
import {Level} from "../../../../types/level.type.ts";
import UpgradeButton from "./UpgradeButton.tsx";

interface UpgradeBoxProps {
    title: string;
    emoji: string;
    currentLevelGrade: number;
    nextLevel: null | Level;
    upgradeCost: number | string;
    enoughTokensForUpdate: boolean;
    isUpgradePending: boolean;
    updateLevel: () => void;
}
const UpgradeBox: React.FC<UpgradeBoxProps> = (
    {   title,
        emoji,
        currentLevelGrade,
        nextLevel,
        upgradeCost,
        enoughTokensForUpdate,
        isUpgradePending,
        updateLevel
    }) => {
    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-1 w-full">
            <div className="flex items-center gap-4">
                <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center">
                    <div className="text-2xl">{emoji}</div>
                </div>
                <div className="text-xl">{title}</div>
                <div className="ml-auto opacity-60">{currentLevelGrade} Lvl</div>
            </div>
            <div className="flex justify-between items-center gap-8">
                <div>
                    {nextLevel && <div className="text-sm opacity-50"> Next Level: {nextLevel.value}</div>}
                    {nextLevel && <div className="text-sm mt-2">{upgradeCost} GPT Tokens</div>}
                </div>

                <UpgradeButton
                    nextLevel={nextLevel}
                    enoughTokensForUpdate={enoughTokensForUpdate}
                    isUpgradePending={isUpgradePending}
                    updateLevel={updateLevel}

                />
            </div>
        </div>
    );
};

export default UpgradeBox;