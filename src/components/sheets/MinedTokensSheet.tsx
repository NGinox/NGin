import {useEffect, useState} from 'react';
import Button from "../../ui/Button.tsx";
import SubscriberService from "../../services/subscriber.service.ts";
import toast from "react-hot-toast";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
import {MAX_AUTOBOT_MINING_TIME_HOURS} from "../../constants/constants.ts";
import {useQueryClient} from "@tanstack/react-query";
import BottomSheet from "../../ui/BottomSheet.tsx";

const MinedTokensSheet = ({subscriber}: {subscriber: CombinedSubscriberData}) => {

    const [minedTokensSheetIsOpen, setMinedTokensSheetIsOpen] = useState(false)
    const [minedTokensUpdateIsPending, setMinedTokensUpdateIsPending] = useState(false)
    const [minedTokens, setMinedTokens] = useState(0)

    const queryClient = useQueryClient()

    useEffect(() => {
        const difference = Math.abs(Date.now() - new Date(subscriber.lastOnline).getTime());
        const maxDifference = MAX_AUTOBOT_MINING_TIME_HOURS * 60 * 60 * 1000;
        const differenceInMinutes =  Math.min(difference, maxDifference) / (60 * 1000);

        if (Math.floor(subscriber.currentAutoBotLevel.tokensPerHour / 60 * differenceInMinutes) > 0) {
            setMinedTokensSheetIsOpen(true)
            setMinedTokens(Math.floor(subscriber.currentAutoBotLevel.tokensPerHour / 60 * differenceInMinutes))
        }

    }, []);

    const updateSubscriberTokensWithMined = () => {
        if (subscriber) {
            setMinedTokensUpdateIsPending(true)
            SubscriberService.updateSubscriberTokens(subscriber.user_id, subscriber.tokens + minedTokens).then(() => {
                queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                    setMinedTokensUpdateIsPending(false)
                    setMinedTokensSheetIsOpen(false)
                    toast.success('Tokens received!')
                })
            })
        }
    }

    return (
        <BottomSheet isOpen={minedTokensSheetIsOpen} setIsOpen={setMinedTokensSheetIsOpen}>
            <div className="flex flex-col items-center text-white font-futuraRegular pb-8 text-center">

                <div className="text-3xl">Mined tokens 🦾</div>

                <div className="text-xl mt-4">While you were offline the AutoBot mined some tokens for you!</div>

                <Button
                    text={"Collect " + minedTokens}
                    style={"text-2xl self-center ml-0 mt-8 max-w-full text-center"}
                    onClick={() => updateSubscriberTokensWithMined()}
                    isPending={minedTokensUpdateIsPending}
                />
            </div>
        </BottomSheet>


    );
};

export default MinedTokensSheet;