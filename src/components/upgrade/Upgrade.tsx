import {useOutletContext} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SubscriberService from "../../services/subscriber.service.ts";
import Loader from "../Loader.tsx";
import {Level} from "../../types/level.type.ts";
import {useState} from "react";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
import UpgradeLayout from "./UpgradeLayout.tsx";

const Upgrade = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const queryClient = useQueryClient()
    const [isUpgradePending, setIsUpgradePending] = useState(false)
    const enoughTokensForUpdate = subscriber.tokens > subscriber.currentLevel.levelUpgradeCost


    const {data: levels, isLoading, isError} = useQuery<Level[]>({
        queryKey: ["levels"],
        queryFn: () => SubscriberService.getClickerLevels()
    })

    const updateLevelMutation = useMutation({
        mutationFn: () => {
            setIsUpgradePending(true)
            return SubscriberService.updateClickerLevel(subscriber)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                setIsUpgradePending(false)
            })
         },
    })

    const getNextLevel = (): Level | null => {
        if (levels) {
            return levels.find(level => level.grade > subscriber.currentLevel.grade) || null;
        }

        return null
    };

    if(isLoading) {
        return <Loader/>
    }

    if(isError) {
        return <div>error</div>
    }


    return (
        <UpgradeLayout
            currentLevelGrade={subscriber.currentLevel.grade}
            maxLevel={getNextLevel()}
            upgradeCost={subscriber.currentLevel.levelUpgradeCost}
            isUpgradePending={isUpgradePending}
            enoughTokensForUpdate={enoughTokensForUpdate}
            updateLevel={() => updateLevelMutation.mutate()}
        />
    );
};


export default Upgrade;