import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useAppStore from "../../../../hooks/useAppStore.ts";
import {AutoBotLevel, Level} from "../../../../types/level.type.ts";
import SubscriberService from "../../../../services/subscriber.service.ts";
import React, {useState} from "react";
import UpgradeBoxSkeleton from "../layouts/UpgradeBoxSkeleton.tsx";
import UpgradeBox from "../layouts/UpgradeBox.tsx";
import toast from "react-hot-toast";

interface UpgradeAutoBotLevel {
    subscriberId: number;
    upgradeInfo: {
        grade: number,
        tokensPerHour: number;
        levelUpgradeCost: number;
    }
}
const UpgradeAutoBotLevel: React.FC<UpgradeAutoBotLevel> = ({subscriberId, upgradeInfo}) => {

    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const queryClient = useQueryClient()
    const { tokens } = useAppStore((state) => ({
        tokens: state.tokens,
    }))

    const {data: levels, isLoading, isError} = useQuery<AutoBotLevel[]>({
        queryKey: ['autoBotLevels'],
        queryFn: () => SubscriberService.getAutoBotLevels()
    })

    const updateLevelMutation = useMutation({
        mutationFn: () => {
            setIsUpgradePending(true)
            return SubscriberService.updateSubscriberAutoBotLevel(subscriberId, upgradeInfo.levelUpgradeCost)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                setIsUpgradePending(false)
                toast.success('Level Upgraded!')
            })
        },
    })

    const enoughTokensForUpdate = tokens >= upgradeInfo.levelUpgradeCost

    const getNextLevel = (): Level | null => {
        // if user can update -> send object of next level, if he's already at max level -> send null
        if (levels) {
            const nextLevel = levels.find(level => level.grade > upgradeInfo.grade);

            if (nextLevel) {
                // Transform the object before returning
                return {
                    grade: nextLevel.grade,
                    value: nextLevel.tokensPerHour + " tokens per hour for 3 hours after last online",
                    levelUpgradeCost: nextLevel.levelUpgradeCost,
                };
            }
        }

        return null
    };

    if(isLoading) {
        return <UpgradeBoxSkeleton/>
    }

    if (isError) {
        return <div>Error :(</div>
    }

    return (
        <UpgradeBox
            title={'Auto bot'}
            emoji={'🦾'}
            currentLevelGrade={upgradeInfo.grade}
            nextLevel={getNextLevel()}
            upgradeCost={upgradeInfo.levelUpgradeCost}
            enoughTokensForUpdate={enoughTokensForUpdate}
            isUpgradePending={isUpgradePending}
            updateLevel={() => updateLevelMutation.mutate()}/>
    );
};

export default UpgradeAutoBotLevel