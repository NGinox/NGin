import React from 'react';
import {Level} from "../../types/level.type.ts";

interface UpgradeLayoutProps {
    currentLevelGrade: number;
    nextLevel: null | Level;
    upgradeCost: number;
    enoughTokensForUpdate: boolean;
    isUpgradePending: boolean;
    updateLevel: () => void;
}
const UpgradeLayout: React.FC<UpgradeLayoutProps> = (
    {   currentLevelGrade,
        nextLevel,
        upgradeCost,
        enoughTokensForUpdate,
        isUpgradePending,
        updateLevel
    }) => {

    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="text-3xl py-4 text-center">
                <span className="inline-block">Upgrade</span>
                <span className="ml-2 inline-block align-middle absolute">⚡</span>
            </div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can upgrade the power of your finger!</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 pb-4">

                <div className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-2 h-full w-full">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center">
                            <div className="text-2xl">☝️</div>
                        </div>
                        <div className="text-xl">Tokens per click</div>
                        <div className="ml-auto opacity-60">{currentLevelGrade} Lvl</div>
                    </div>
                    <div className="flex justify-between items-center">
                        {nextLevel && <div className="text-sm">{upgradeCost} GPT Tokens</div>}
                        <UpgradeButton nextLevel={nextLevel} enoughTokensForUpdate={enoughTokensForUpdate} isUpgradePending={isUpgradePending} updateLevel={updateLevel}/>
                    </div>
                </div>

            </div>

        </div>
    );
};

interface UpgradeButtonProps {
    nextLevel: null | Level;
    enoughTokensForUpdate: boolean;
    isUpgradePending: boolean;
    updateLevel: () => void;
}
const UpgradeButton: React.FC<UpgradeButtonProps> = (
    {   nextLevel,
        enoughTokensForUpdate,
        isUpgradePending,
        updateLevel
    }) => {

    const buttonStyle = "flex flex-col items-center gap-1 flex-1 p-2 rounded-xl bg-[#E23969] ml-auto pl-4 pr-4 max-w-min whitespace-nowrap"

    if (!nextLevel) {
        return <span className={`${buttonStyle} opacity-50`}>Max</span>
    } else {
        return (
            <span onClick={() => enoughTokensForUpdate && !isUpgradePending && updateLevel()}
                  className={`${buttonStyle} ${(!enoughTokensForUpdate || isUpgradePending) && "opacity-50"}`}>Level Up</span>
        )
    }

}

export default UpgradeLayout;