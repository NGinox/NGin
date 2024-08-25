import React, {useState} from 'react';
import {colorfulRobot, highVoltage} from "../../images";
import {MAX_ENERGY} from "../../constants/constants.ts";


interface ClickerViewProps {
    isPressed: boolean;
    tokens: number;
    tokensPerClick: number;
    energyToReduce: number;
    energy: number
    updateStateOnClick: (e: React.TouchEvent<HTMLDivElement>) => void;
}
const ClickerLayout: React.FC<ClickerViewProps> = (
    {   isPressed,
        tokens,
        tokensPerClick,
        energyToReduce,
        energy,
        updateStateOnClick
    }) => {

    const [clicks, setClicks] =
        useState<{ id: number, x: number, y: number }[]>([]);

    const handleAnimationEnd = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    const onHandleClick = (e: React.TouchEvent<HTMLDivElement>) => {
        let x = 0
        let y = 0

        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            const rect = e.currentTarget.getBoundingClientRect();
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        }

        if (energy > energyToReduce) {
            updateStateOnClick(e)
            setClicks([...clicks, { id: Date.now(), x, y }]);
        }
    }

    return (
        <div className="h-full w-full z-10 flex flex-col items-center text-white flex-grow">

            {/* Squads and counter */}
            <div className="w-full px-4 z-10">
                <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                    <p className="text-lg opacity-30">Squads coming soon...</p>
                </div>
            </div>

            {/*Coin*/}
            <div className="flex-grow flex flex-col items-center">
                <div className="mt-12 text-5xl font-bold flex items-center">
                    <span className="ml-2" style={{fontFamily: "Futura"}}>{formatNumberWithSpaces(Number(tokens.toFixed(1)))}</span>
                </div>
                <div className="relative flex mt-4 flex-grow items-center" onTouchStart={onHandleClick}>
                    <div
                        style={isPressed ? {transform: 'scale(0.95)'} : {transform: 'scale(1)'}}
                        className="rounded-full border-8 border-[#f3c45a] shadow-[0_0_15px_5px_rgba(252,204,75,1)] transform transition-transform duration-100">
                        <img src={colorfulRobot} width={256} height={256} alt="notcoin" className=""/>
                    </div>
                    {clicks.map((click) => (
                        <div
                            key={click.id}
                            className="absolute text-5xl font-bold opacity-0"
                            style={{
                                top: `${click.y - 42}px`,
                                left: `${click.x - 28}px`,
                                animation: `float 1s ease-out`
                            }}
                            onAnimationEnd={() => handleAnimationEnd(click.id)}>
                            {tokensPerClick}
                        </div>
                    ))}
                </div>
            </div>

            {/* Energy bar */}
            <div className="w-full pb-4 z-10 flex flex-col gap-4">
                <Energy energy={Number(energy.toFixed(1))} maxEnergy={MAX_ENERGY}/>
            </div>
        </div>
    );
};

const Energy = ({ energy, maxEnergy}: EnergyProps) => {
    return (
        <>
            <div className="w-full flex flex-row items-center" style={{fontFamily: 'Futura, sans-family'}}>
                <img src={highVoltage} width={32} height={32} alt="High Voltage"/>
                <div className="flex flex-row items-center ml-auto">
                    <div className="text-white text-xl font-bold">{energy} / <span
                        className="opacity-50 ">{maxEnergy}</span>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#18091c] rounded-full mt-2">
                <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
                     style={{width: `${(energy / maxEnergy) * 100}%`}}></div>
            </div>
        </>
    )
};

type EnergyProps = {
    energy: number;
    maxEnergy: number;
}

function formatNumberWithSpaces(number: number) {
    const numStr = number.toString();
    // Use a regular expression to add a space every three digits from the end
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default ClickerLayout;