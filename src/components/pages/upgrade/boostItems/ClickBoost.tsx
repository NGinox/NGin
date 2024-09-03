import React, {useState} from 'react';
import BoostBox from "../layouts/BoostBox.tsx";
import {BoostItem} from "../Boost.tsx";
import useUpdateBoostsMutation from "../../../../hooks/mutations/useUpdateBoostsMutation.tsx";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";
import {CombinedSubscriberData} from "../../../../types/subscriber.type.ts";
import useAppStore from "../../../../hooks/useAppStore.ts";

const ClickBoost: React.FC<BoostItem> = ({boosts, subscriber}) => {

    const [isPending, setIsPending] = useState(false)
    const { mutate: updateBoostMutation } = useUpdateBoostsMutation(
        subscriber.user_id, () => onSuccessBoostRemove(), true)

    const queryClient = useQueryClient()

    const divideTokensPerClick = () => {
        queryClient.setQueryData(
            ['subscriber', {'subscriberId': subscriber.user_id}],
            (oldSubscriber: CombinedSubscriberData): CombinedSubscriberData => {
                if (oldSubscriber) {
                    return {
                        ...oldSubscriber,
                        tokens: useAppStore.getState().tokens,
                        currentLevel: {
                            ...oldSubscriber.currentLevel,
                            tokensPerClick: oldSubscriber.currentLevel.tokensPerClick / 2
                        }
                    }
                }
                return oldSubscriber
            }
        )
    }

    const handleOnClick = () =>  {
        setIsPending(true)
        if (!((boosts.doubleClickBoost - 1) < 0)) {
            updateBoostMutation({
                subscriberId: subscriber.user_id,
                boosts: {
                    dayOfUsingBoost: Date.now(),
                    fulfillEnergyBoost: boosts.fulfillEnergyBoost,
                    infiniteEnergyBoost: boosts.infiniteEnergyBoost,
                    doubleClickBoost: boosts.doubleClickBoost - 1,
                },
            });
        }
    }

    const onSuccessBoostRemove = () => {
        setIsPending(false)
        toast.success('Clicks are doubled for 10 secs!')
        setTimeout(() => {
            divideTokensPerClick()
        }, 10000)
    }

    return (
        <BoostBox
            emoji={'X2'}
            title={'Double click'}
            count={boosts.doubleClickBoost}
            onClick={handleOnClick}
            isPending={isPending}
            isEnabled={boosts.doubleClickBoost !== 0}
        />
    );
};

export default ClickBoost;