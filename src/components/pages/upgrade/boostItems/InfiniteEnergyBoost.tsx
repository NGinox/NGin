import BoostBox from "../layouts/BoostBox.tsx";
import {BoostItem} from "../Boost.tsx";
import React, {useState} from "react";
import useUpdateBoostsMutation from "../../../../hooks/mutations/useUpdateBoostsMutation.tsx";
import useAppStore from "../../../../hooks/useAppStore.ts";
import toast from "react-hot-toast";

const InfiniteEnergyBoost: React.FC<BoostItem> = ({boosts, subscriber}) => {

    const [isPending, setIsPending] = useState(false)
    const { mutate: updateBoostMutation } = useUpdateBoostsMutation(
        subscriber.user_id, () => onSuccessCallback())

    const handleOnClick = () => {
        setIsPending(true)
        updateBoostMutation({
            subscriberId: subscriber.user_id,
            boosts: {
                dayOfUsingBoost: Date.now(),
                fulfillEnergyBoost: boosts.fulfillEnergyBoost,
                infiniteEnergyBoost: boosts.infiniteEnergyBoost - 1,
                doubleClickBoost: boosts.doubleClickBoost,
            }})
    }

    const onSuccessCallback = () => {
        setIsPending(false)
        useAppStore.getState().updateInfiniteEnergy(true)
        toast.success('Energy is infinite for 10 secs!')
        setTimeout(() => {
            useAppStore.getState().updateInfiniteEnergy(false)
        }, 10000)
    }

    return (
        <BoostBox
            emoji={'⏳'}
            title={"Infinite energy"}
            count={boosts.infiniteEnergyBoost}
            onClick={handleOnClick}
            isPending={isPending}
            isEnabled={boosts.infiniteEnergyBoost !== 0}
        />
    );
};

export default InfiniteEnergyBoost;