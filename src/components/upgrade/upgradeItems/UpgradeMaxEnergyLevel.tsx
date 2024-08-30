import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useAppStore from "../../../hooks/useAppStore.ts";
import {Level, MaxEnergyLevel} from "../../../types/level.type.ts";
import SubscriberService from "../../../services/subscriber.service.ts";
import React, {useState} from "react";
import UpgradeBoxSkeleton from "../layouts/UpgradeBoxSkeleton.tsx";
import UpgradeBox from "../layouts/UpgradeBox.tsx";
import toast from "react-hot-toast";

interface UpgradeMaxEnergyLevel {
    subscriberId: number;
    upgradeInfo: {
        grade: number,
        maxEnergy: number;
        levelUpgradeCost: number;
    }
}
const UpgradeMaxEnergyLevel: React.FC<UpgradeMaxEnergyLevel> = ({subscriberId, upgradeInfo}) => {

    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const queryClient = useQueryClient()
    const { tokens } = useAppStore((state) => ({
        tokens: state.tokens,
    }))

    const {data: levels, isLoading, isError} = useQuery<MaxEnergyLevel[]>({
        queryKey: ['maxEnergyLevels'],
        queryFn: () => SubscriberService.getMaxEnergyLevels()
    })

    const updateLevelMutation = useMutation({
        mutationFn: () => {
            setIsUpgradePending(true)
            return SubscriberService.updateSubscriberMaxEnergy(subscriberId, upgradeInfo.levelUpgradeCost)
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
                    value: nextLevel.maxEnergy + " Max energy",
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
            title={'Max energy'}
            emoji={'⚡'}
            currentLevelGrade={upgradeInfo.grade}
            nextLevel={getNextLevel()}
            upgradeCost={upgradeInfo.levelUpgradeCost}
            enoughTokensForUpdate={enoughTokensForUpdate}
            isUpgradePending={isUpgradePending}
            updateLevel={() => updateLevelMutation.mutate()}/>
    );
};

export default UpgradeMaxEnergyLevel