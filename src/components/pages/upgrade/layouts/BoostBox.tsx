import Button from "../../../../ui/Button.tsx";
import React from "react";
import {MAX_BOOST_NUMBER} from "../../../../constants/constants.ts";

interface BoostBoxProps {
    emoji: string;
    title: string;
    onClick: () => void;
    count: number;
    isPending: boolean;
    isEnabled: boolean;
}
const BoostBox: React.FC<BoostBoxProps> = (
    {   emoji,
        title,
        onClick,
        count,
        isPending,
        isEnabled

    }) => {
    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col">
            <div className="flex flex-col items-center gap-2 mb-2">
                <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center flex-grow">
                    <div className="text-2xl">{emoji}</div>
                </div>
                <div className="text-sm text-center flex-1">{title}</div>
            </div>
            <Button text={`${count} / ${MAX_BOOST_NUMBER}`} style={"max-w-full text-center p-1 mt-auto"} onClick={onClick} isPending={isPending} isEnabled={isEnabled}/>
        </div>
    );
};

export default BoostBox;