import {useOutletContext} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SubscriberService from "../../services/subscriber.service.ts";
import Loader from "../Loader.tsx";
import {Level} from "../../types/level.type.ts";
import {useState} from "react";

const Upgrade = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const {data: levels, isLoading, isError} = useQuery<Level[]>({
        queryKey: ["levels"],
        queryFn: () => SubscriberService.getClickerLevels()
    })

    const queryClient = useQueryClient()
    const [isUpgradePending, setIsUpgradePending] = useState(false)

    const updateLevelMutation = useMutation({
        mutationFn: () => {
            setIsUpgradePending(true)
            return SubscriberService.updateClickerLevel(subscriber)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                setIsUpgradePending(false)
                console.log("pending ", isUpgradePending)
            })
         },
    })

    const subscriberCanUpgrade = subscriber.tokens > subscriber.currentLevel.levelUpgradeCost


    if(isLoading) {
        return <Loader/>
    }

    if(isError) {
        return <div>error</div>
    }

    const getNextLevel = (): Level | null => {
        if (levels) {
            return levels.find(level => level.grade > subscriber.currentLevel.grade) || null;
        }

        return null
    };

    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="text-3xl py-4 text-center">
                <span className="inline-block">Upgrade</span>
                <span className="ml-2 inline-block align-middle absolute">⚡</span>
            </div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can upgrade the power of your finger!</span>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 pb-4">
                <div
                    className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-2 h-full w-full"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center">
                            <div className="text-2xl">☝️</div>
                        </div>
                        <div className="text-xl">Tokens per click</div>
                        <div className="ml-auto opacity-60">{subscriber.currentLevel.grade} Lvl</div>
                    </div>
                    <div className="flex justify-between items-center">
                        {getNextLevel() &&
                            <div className="text-sm">{subscriber.currentLevel.levelUpgradeCost} GPT Tokens</div>}
                        {getNextLevel() ?
                            <span
                                onClick={() => subscriberCanUpgrade && !isUpgradePending && updateLevelMutation.mutate()}
                                className={`flex flex-col items-center gap-1 flex-1 p-2 rounded-xl bg-[#E23969] ml-auto pl-4 pr-4 max-w-min whitespace-nowrap ${(!subscriberCanUpgrade || isUpgradePending) && "opacity-50"}`}>Level Up</span>
                            :
                            <span
                                className="opacity-50 flex flex-col items-center gap-1 flex-1 p-2 rounded-xl bg-[#E23969] ml-auto pl-4 pr-4 max-w-min whitespace-nowrap">Max</span>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};


export default Upgrade;