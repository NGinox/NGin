import ClickerLayout from "./ClickerLayout.tsx";
import React, {useEffect, useRef, useState} from "react";
import SubscriberService from "../../../services/subscriber.service.ts";
import {DELAY_OF_TOKENS_SYNC} from "../../../constants/constants.ts";
import useAppStore from "../../../hooks/useAppStore.ts";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../../types/subscriber.type.ts";

const Clicker = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const tokensPerClick = subscriber.currentLevel.tokensPerClick
    const maxEnergy = subscriber.currentMaxEnergyLevel.maxEnergy

    // Mirror the variable to pay attention that value of tokens to reduce is equal to energy to reduce
    const energyToReduce = tokensPerClick


    const { energy, decreaseEnergy, tokens, updateTokens } = useAppStore((state) => ({
        energy: state.energy,
        decreaseEnergy: state.decreaseEnergy,
        tokens: state.tokens,
        updateTokens: state.updateTokens
    }))

    const [isPressed, setIsPressed] = useState(false)

    const timerRef = useRef<number | null>(null);

    // To prevent server overload the request will be sent when user is not clicking for DELAY_OF_TOKENS_SYNC
    useEffect(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            if (subscriber) {
                SubscriberService.syncSubscriberData(subscriber.user_id, Number(tokens.toFixed(1)), energy);
            }
        }, DELAY_OF_TOKENS_SYNC);

    }, [tokens, subscriber]);


    const updateStateOnClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (energyToReduce - energyToReduce < 0) {
            return;
        }

        // Animate coin on tap
        setIsPressed(true)
        setTimeout(() => {
            setIsPressed(false)
        }, 100)

        let touchesCount = 1

        if ('touches' in e) {
            touchesCount = e.changedTouches.length
        }

        if (energy > energyToReduce) {
            decreaseEnergy(energyToReduce)
            updateTokens(tokens + tokensPerClick * touchesCount)
        }
    };

    return (
        <ClickerLayout
            subscriber={subscriber}
            tokens={tokens}
            energy={energy}
            maxEnergy={maxEnergy}
            tokensPerClick={tokensPerClick}
            energyToReduce={energyToReduce}
            isPressed={isPressed}
            updateStateOnClick={(e: React.TouchEvent<HTMLDivElement>) => updateStateOnClick(e)}/>
    );
};

export default Clicker;