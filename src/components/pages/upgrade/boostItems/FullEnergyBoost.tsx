import BoostBox from "../layouts/BoostBox.tsx";
import React, {useState} from "react";
import {BoostItem} from "../Boost.tsx";
import useUpdateBoostsMutation from "../../../../hooks/mutations/useUpdateBoostsMutation.tsx";
import useAppStore from "../../../../hooks/useAppStore.ts";
import toast from "react-hot-toast";
import Websocket from "../../../../api/websocket.ts";

const FullEnergyBoost: React.FC<BoostItem> = ({ boosts, subscriber}) => {

    const [isPending, setIsPending] = useState(false)
    const { mutate: updateBoostMutation } = useUpdateBoostsMutation(
        subscriber.user_id, () => onSuccessBoostRemove())

    const handleOnClick = () => {
        setIsPending(true)
        updateBoostMutation({
            subscriberId: subscriber.user_id,
            boosts: {
                dayOfUsingBoost: Date.now(),
                fulfillEnergyBoost: boosts.fulfillEnergyBoost - 1,
                infiniteEnergyBoost: boosts.infiniteEnergyBoost,
                doubleClickBoost: boosts.doubleClickBoost,
            }})
    }

    const onSuccessBoostRemove = () => {
        setIsPending(false)
        useAppStore.getState().updateEnergy(subscriber.currentMaxEnergyLevel.maxEnergy)
        Websocket.syncTokensAndEnergy(useAppStore.getState().tokens, useAppStore.getState().energy)
        toast.success('Energy is full!')
    }

    return (
        <BoostBox
            title={"Fulfill the energy"}
            emoji={'🔋'}
            onClick={handleOnClick}
            count={boosts.fulfillEnergyBoost}
            isPending={isPending}
            isEnabled={boosts.fulfillEnergyBoost !== 0}
        />
    );
};

export default FullEnergyBoost;