import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import SubscriberService from "../services/subscriber.service.ts";
import BottomSheet from "../ui/BottomSheet.tsx";
import {CombinedSubscriberData} from "../types/subscriber.type.ts";
import {REWARD_PARENT_REFERRAL, REWARD_REFERRAL} from "../constants/constants.ts";
import toast from "react-hot-toast";
import Button from "../ui/Button.tsx";
import '../App.css'
import WebApp from "@twa-dev/sdk";

const ReferralHandler = ({subscriber} : {subscriber: CombinedSubscriberData}) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)
    const [reward, setReward] = useState(0)
    const [isReferral, setIsReferral] = useState(true)

    const [isPending, setIsPending] = useState(false)

    const queryClient = useQueryClient()

    const addReferralMutation = useMutation({
        mutationFn: (parentReferralId: number) => SubscriberService.addReferral(parentReferralId, subscriber.user_id),
        onSuccess: () => {
            setReward(REWARD_REFERRAL)
            setIsOpen(true)
        }
    })

    const updateTokensForReferral = useMutation({
        mutationFn: () => {
            setIsPending(true)
            return SubscriberService.updateSubscriberTokens(subscriber.user_id, subscriber.tokens + REWARD_REFERRAL)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                setIsOpen(false)
                toast.success('Reward received!')
            })
        }
    })

    const getParentReferralRewardMutation = useMutation({
        mutationFn: () => {
            setIsPending(true)
            return SubscriberService.getReferralReward(subscriber.user_id, subscriber.tokens + reward)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                setIsOpen(false)
                toast.success('Reward for referral(s) received!')
            })
        }
    })

    useEffect(() => {

        // case when the user is parent referral
        if (subscriber.newReferrals.length > 0) {
            setIsReferral(false)
            setReward(REWARD_PARENT_REFERRAL * subscriber.newReferrals.length)
            setIsOpen(true)
        }

        // case when user is referral
        else {
            if (subscriber.myReferral === 0) { // no referral
                const getQueryParams = () => {
                    const startParam = WebApp.initDataUnsafe.start_param
                    if (startParam) {
                        addReferralMutation.mutate(Number(startParam))
                    }
                };
                getQueryParams();
            }
        }

    }, [location.search]);

    return (
        <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen} disableDrag={true}>
            <div className="font-futuraRegular text-white pb-8">

                {isReferral
                    ?
                    <div className="flex flex-col items-center">
                        <div className="text-3xl">
                            Get referral bonus
                        </div>
                        <div className="text-center mt-2">
                            Your friend really likes our app so he decided to share it with you and now you get a bonus!
                        </div>
                        <div className="animatedBackground p-2 pl-4 pr-4 text-xl rounded-xl mt-4">
                            + {reward} GPT Tokens
                        </div>
                        <Button
                            text={"Get reward"}
                            style={"text-2xl self-center ml-0 max-w-full text-center w-full mt-4"}
                            onClick={() => {
                                updateTokensForReferral.mutate()
                            }}
                            isPending={isPending}
                        />
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <div className="text-3xl">Get referral bonus</div>
                        <div className="text-center mt-2">
                            You received {subscriber.newReferrals.length} referral(s)!
                        </div>
                        <div className="animatedBackground p-2 pl-4 pr-4 text-xl rounded-xl mt-4">
                            + {reward} GPT Tokens
                        </div>
                        <Button
                            text={"Get reward"}
                            style={"text-2xl self-center ml-0 max-w-full text-center w-full mt-4"}
                            onClick={() => {
                                getParentReferralRewardMutation.mutate()
                            }}
                            isPending={isPending}
                        />
                    </div>
                }
            </div>
        </BottomSheet>
    )
};

export default ReferralHandler;