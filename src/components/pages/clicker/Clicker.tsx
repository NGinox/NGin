import ClickerLayout from "./ClickerLayout.tsx";
import React, {useState} from "react";
import useAppStore from "../../../hooks/useAppStore.ts";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../../types/subscriber.type.ts";
import Websocket from "../../../api/websocket.ts";

const Clicker = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    const tokensPerClick = subscriber.currentLevel.tokensPerClick
    const maxEnergy = subscriber.currentMaxEnergyLevel.maxEnergy

    // Mirror the variable to pay attention that value of tokens to reduce is equal to energy to reduce
    const energyToReduce = tokensPerClick

    const { energy, decreaseEnergy, tokens, updateTokens, infiniteEnergy } = useAppStore((state) => ({
        energy: state.energy,
        decreaseEnergy: state.decreaseEnergy,
        tokens: state.tokens,
        updateTokens: state.updateTokens,
        infiniteEnergy: state.infiniteEnergy
    }))

    const [isPressed, setIsPressed] = useState(false)

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
            if (!infiniteEnergy) {
                decreaseEnergy(energyToReduce)
            }
            updateTokens(tokens + tokensPerClick * touchesCount)

            Websocket.syncTokensAndEnergy(useAppStore.getState().tokens, useAppStore.getState().energy)
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