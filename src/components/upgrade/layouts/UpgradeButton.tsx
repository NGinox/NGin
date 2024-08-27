import {Level} from "../../../types/level.type.ts";
import React from "react";

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
    }

    if (isUpgradePending) {
        return <span
            className="p-2 rounded-xl bg-[#3c284a] ml-auto pl-4 pr-4 max-w-min animate-pulse text-purple-300 whitespace-nowrap">Upgrading...</span>
    }

    return (
        <span onClick={() => enoughTokensForUpdate && updateLevel()}
              className={`${buttonStyle} ${!enoughTokensForUpdate  && "opacity-50"}`}>Level Up</span>
    )

}

export default UpgradeButton