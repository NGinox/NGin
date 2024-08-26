import {useOutletContext} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SubscriberService from "../../services/subscriber.service.ts";
import {Level} from "../../types/level.type.ts";
import {useState} from "react";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
import UpgradeLayout from "./UpgradeLayout.tsx";
import HandleLoadingAndError from "../HandleLoadingAndError.tsx";
import useAppStore from "../../hooks/useAppStore.ts";

const Upgrade = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const queryClient = useQueryClient()
    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const { tokens } = useAppStore((state) => ({
        tokens: state.tokens,
    }))

    const enoughTokensForUpdate = tokens >= subscriber.currentLevel.levelUpgradeCost


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
        // if user can update -> send object of next level, if he's already at max level -> send null
        if (levels) {
            return levels.find(level => level.grade > subscriber.currentLevel.grade) || null;
        }

        return null
    };

    return (
        <HandleLoadingAndError isLoading={isLoading} isError={isError}>
            <UpgradeLayout
                currentLevelGrade={subscriber.currentLevel.grade}
                nextLevel={getNextLevel()}
                upgradeCost={subscriber.currentLevel.levelUpgradeCost}
                isUpgradePending={isUpgradePending}
                enoughTokensForUpdate={enoughTokensForUpdate}
                updateLevel={() => updateLevelMutation.mutate()}
            />
        </HandleLoadingAndError>

    );
};


export default Upgrade;