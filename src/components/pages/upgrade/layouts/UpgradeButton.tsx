import {Level} from "../../../../types/level.type.ts";
import React from "react";
import Button from "../../../../ui/Button.tsx";

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

    if (!nextLevel) {
        return <Button isEnabled={false} text={"Max"} style={"self-end"}/>
    }

    if (isUpgradePending) {
        return <Button isPending={true} text={"Upgrading..."} style={"self-end"}/>
    }

    return (
        <Button
            onClick={() => enoughTokensForUpdate && updateLevel()}
            isEnabled={enoughTokensForUpdate}
            text={"Level Up"}
            style={"self-end"}
        />
    )

}

export default UpgradeButton