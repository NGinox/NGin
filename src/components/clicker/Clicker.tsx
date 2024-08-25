import ClickerLayout from "./ClickerLayout.tsx";
import React, {useEffect, useRef, useState} from "react";
import SubscriberService from "../../services/subscriber.service.ts";
import {DELAY_OF_TOKENS_SYNC, ENERGY_TO_REDUCE} from "../../constants/constants.ts";
import useAppStore from "../../hooks/useAppStore.ts";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";

const Clicker = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const { energy, decreaseEnergy, tokens, updateTokens } = useAppStore((state) => ({
        energy: state.energy,
        decreaseEnergy: state.decreaseEnergy,
        tokens: state.tokens,
        updateTokens: state.updateTokens
    }))

    const [isPressed, setIsPressed] = useState(false)

    const timerRef = useRef<number | null>(null);

    // To prevent server overload the request will be sent when user is not clicking for 1 second
    useEffect(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            if (subscriber) {
                SubscriberService.updateSubscriberTokens(subscriber.user_id, Number(tokens.toFixed(1)));
            }
        }, DELAY_OF_TOKENS_SYNC);

    }, [tokens, subscriber]);


    const updateStateOnClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (ENERGY_TO_REDUCE - ENERGY_TO_REDUCE < 0) {
            return;
        }

        // Animate tap on coin
        setIsPressed(true)
        setTimeout(() => {
            setIsPressed(false)
        }, 100)

        let touchesCount = 1

        if ('touches' in e) {
            touchesCount = e.touches.length
        }

        if(energy > ENERGY_TO_REDUCE) {
            decreaseEnergy(ENERGY_TO_REDUCE)
            updateTokens(tokens + subscriber.currentLevel.tokensPerClick * touchesCount)
        }

        // TODO: Perform the saving of this data on app close
        localStorage.setItem("energy", useAppStore.getState().energy.toString())
        localStorage.setItem("exitAppTime", Date.now().toString())
    };

    return (
        <ClickerLayout
            tokens={tokens}
            energy={energy}
            tokensPerClick={subscriber.currentLevel.tokensPerClick}
            isPressed={isPressed}
            updateStateOnClick={(e: React.TouchEvent<HTMLDivElement>) => updateStateOnClick(e)}/>
    );
};

export default Clicker;