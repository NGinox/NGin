import {useMutation, useQueryClient} from "@tanstack/react-query";
import SubscriberService from "../../services/subscriber.service.ts";
import {Boosts} from "../../types/boost.type.ts";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";

const useUpdateBoostsMutation = (
    subscriberId: number,
    onSuccessCallback: () => void,
    doubleTokens: boolean = false
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({subscriberId, boosts}: { subscriberId: number, boosts: Boosts }) => {
            return SubscriberService.updateSubscriberBoosts(subscriberId, boosts)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['subscriber', {'subscriberId': subscriberId}],
                (oldSubscriber: CombinedSubscriberData): CombinedSubscriberData => {
                    if (oldSubscriber) {
                        if (doubleTokens) {
                            return {
                                ...oldSubscriber,
                                boosts: data,
                                currentLevel: {
                                    ...oldSubscriber.currentLevel,
                                    tokensPerClick: oldSubscriber.currentLevel.tokensPerClick * 2
                                }
                            }
                        }
                        return {
                            ...oldSubscriber,
                            boosts: data,
                        }
                    }

                    return oldSubscriber
                }
            )
            setTimeout(() => {
                onSuccessCallback()
            }, 100)
        }
    })
};

export default useUpdateBoostsMutation