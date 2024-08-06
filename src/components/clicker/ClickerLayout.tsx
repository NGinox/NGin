import React, {useState} from 'react';
import {colorfulRobot} from "../../images";
import Energy from "./Energy.tsx";
import {MAX_ENERGY, TOKENS_PER_CLICK} from "../../constants/constants.ts";

interface ClickerViewProps {
    isPressed: boolean;
    tokens: number;
    energy: number
    updateStateOnClick: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
}
const ClickerLayout: React.FC<ClickerViewProps> = ({isPressed, tokens, energy, updateStateOnClick}) => {

    const [clicks, setClicks] =
        useState<{ id: number, x: number, y: number }[]>([]);

    const handleAnimationEnd = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    const onHandleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();

        let x = 0
        let y = 0

        if ('touches' in e) {
            for (let i = 0; i < e.touches.length; i++) {
                const touch = e.touches[i];
                const rect = e.currentTarget.getBoundingClientRect();
                x = touch.clientX - rect.left;
                y = touch.clientY - rect.top;
                console.log(`Touch ${i + 1} at x: ${x}, y: ${y}`);
            }
        } else {
            // Handle mouse event
            const rect = e.currentTarget.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            console.log(`Mouse click at x: ${x}, y: ${y}`);
        }
        updateStateOnClick(e)
        setClicks([...clicks, { id: Date.now(), x, y }]);
    }

    return (
        <div className="h-full w-full z-10 flex flex-col items-center text-white flex-grow">

            {/* Squads and counter */}
            <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
                <div className="w-full cursor-pointer">
                    <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                        <p className="text-lg opacity-30">Squads coming soon...</p>
                    </div>
                </div>
                <div className="mt-12 text-5xl font-bold flex items-center">
                    <span className="ml-2" style={{fontFamily: "Futura"}}>{formatNumberWithSpaces(tokens)}</span>
                </div>
            </div>

            {/*Coin*/}
            <div className="flex-grow flex items-center justify-center">
                <div className="relative mt-4" onClick={onHandleClick}>
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
                            {TOKENS_PER_CLICK}
                        </div>
                    ))}
                </div>
            </div>

            {/* Energy bar */}
            <div className="w-full px-4 pb-4 z-10 flex flex-col gap-4">
                <Energy energy={energy} maxEnergy={MAX_ENERGY}/>
            </div>
        </div>
    );
};

function formatNumberWithSpaces(number: number) {
    const numStr = number.toString();
    // Use a regular expression to add a space every three digits from the end
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default ClickerLayout;