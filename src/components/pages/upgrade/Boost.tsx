import FullEnergyBoost from "./boostItems/FullEnergyBoost.tsx";
import InfiniteEnergyBoost from "./boostItems/InfiniteEnergyBoost.tsx";
import ClickBoost from "./boostItems/ClickBoost.tsx";
import {Boosts} from "../../../types/boost.type.ts";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../../types/subscriber.type.ts";
import {MAX_BOOST_NUMBER} from "../../../constants/constants.ts";
import {useEffect, useState} from "react";
import useUpdateBoostsMutation from "../../../hooks/mutations/useUpdateBoostsMutation.tsx";
import BoostBoxSkeleton from "./layouts/BoostBoxSkeleton.tsx";

const Boost = () => {

    const [isPending, setIsPending] = useState(false)

    const subscriber = useOutletContext<CombinedSubscriberData>()
    const { mutate: updateBoostMutation } = useUpdateBoostsMutation(
        subscriber.user_id, () => setIsPending(false))


    useEffect(() => {
        if (isCurrentDayEarlier(subscriber.boosts.dayOfUsingBoost)) {
            setIsPending(true)
            updateBoostMutation({subscriberId: subscriber.user_id, boosts: {
                    dayOfUsingBoost: Date.now(),
                    fulfillEnergyBoost: MAX_BOOST_NUMBER,
                    infiniteEnergyBoost: MAX_BOOST_NUMBER,
                    doubleClickBoost: MAX_BOOST_NUMBER,
                }})
        }
    }, []);

    if (isPending) {
        return (
            <div className="grid grid-cols-3 gap-1 mt-6">
                <BoostBoxSkeleton/>
                <BoostBoxSkeleton/>
                <BoostBoxSkeleton/>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-2 mt-6">
            <FullEnergyBoost
                boosts={subscriber.boosts}
                subscriber={subscriber}
            />
            <InfiniteEnergyBoost
                boosts={subscriber.boosts}
                subscriber={subscriber}
            />
            <ClickBoost
                boosts={subscriber.boosts}
                subscriber={subscriber}
            />
        </div>
    );
};

function isCurrentDayEarlier(savedTimestamp: number) {
    const currentDate = new Date();
    console.log(currentDate)
    const savedDate = new Date(savedTimestamp);
    console.log(savedDate)

    // Compare year, month, and day
    if (currentDate.getFullYear() > savedDate.getFullYear()) {
        return true;
    } else if (currentDate.getFullYear() === savedDate.getFullYear()) {
        if (currentDate.getMonth() > savedDate.getMonth()) {
            return true
        }
        else if (currentDate.getDate() > savedDate.getDate()) {
            return true
        }
    }
    return false
}

export interface BoostItem {
    boosts: Boosts,
    subscriber: CombinedSubscriberData
}

export default Boost;