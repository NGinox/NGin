import UpgradeBox from "../layouts/UpgradeBox.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Level, TapLevel} from "../../../types/level.type.ts";
import SubscriberService from "../../../services/subscriber.service.ts";
import React, {useState} from "react";
import useAppStore from "../../../hooks/useAppStore.ts";
import UpgradeBoxSkeleton from "../layouts/UpgradeBoxSkeleton.tsx";
import toast from "react-hot-toast";

interface UpgradeTapLevel {
    subscriberId: number;
    upgradeInfo: {
        grade: number,
        tokensPerClick: number;
        levelUpgradeCost: number;
    }
}
const UpgradeTapLevel: React.FC<UpgradeTapLevel> = ({upgradeInfo, subscriberId}) => {

    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const queryClient = useQueryClient()
    const { tokens } = useAppStore((state) => ({
        tokens: state.tokens,
    }))

    const {data: levels, isLoading, isError} = useQuery<TapLevel[]>({
        queryKey: ['levels'],
        queryFn: () => SubscriberService.getClickerLevels()
    })

    const updateLevelMutation = useMutation({
        mutationFn: () => {
            setIsUpgradePending(true)
            return SubscriberService.updateClickerLevel(subscriberId, upgradeInfo.levelUpgradeCost)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                toast.success('Level Upgraded!')
                setIsUpgradePending(false)
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
                    value: nextLevel.tokensPerClick,
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
            title={'Tokens per click'}
            emoji={'☝️'}
            currentLevelGrade={upgradeInfo.grade}
            nextLevel={getNextLevel()}
            upgradeCost={upgradeInfo.levelUpgradeCost}
            enoughTokensForUpdate={enoughTokensForUpdate}
            isUpgradePending={isUpgradePending}
            updateLevel={() => updateLevelMutation.mutate()}/>
    );
};

export default UpgradeTapLevel;