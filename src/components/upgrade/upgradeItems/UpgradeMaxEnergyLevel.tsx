import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import useAppStore from "../../../hooks/useAppStore.ts";
import {Level} from "../../../types/level.type.ts";
import SubscriberService from "../../../services/subscriber.service.ts";
import React, {useState} from "react";
import UpgradeBoxSkeleton from "../layouts/UpgradeBoxSkeleton.tsx";
import UpgradeBox from "../layouts/UpgradeBox.tsx";

interface UpgradeMaxEnergyLevel {
    subscriberId: number;
    upgradeInfo: {
        grade: number,
        maxEnergy: number;
        levelUpgradeCost: number;
    }
}
const UpgradeMaxEnergyLevel: React.FC<UpgradeMaxEnergyLevel> = ({subscriberId, upgradeInfo}) => {

    const queryClient = useQueryClient()
    const { tokens } = useAppStore((state) => ({
        tokens: state.tokens,
    }))

    const {data: levels, isLoading, isError} = useQuery<Level[]>({
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
            })
        },
    })

    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const enoughTokensForUpdate = tokens >= upgradeInfo.levelUpgradeCost

    const getNextLevel = (): Level | null => {
        // if user can update -> send object of next level, if he's already at max level -> send null
        if (levels) {
            return levels.find(level => level.grade > upgradeInfo.grade) || null;
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