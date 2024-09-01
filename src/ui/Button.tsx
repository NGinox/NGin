import React from "react";

interface ButtonProps {
    isEnabled?: boolean;
    isPending?: boolean;
    text: string;
    onClick?: () => void;
    style?: string;
}
const Button: React.FC<ButtonProps> = (
    {
        isEnabled = true,
        isPending = false,
        text,
        onClick,
        style = "",
    }) => {

    const buttonStyle = `self-start gap-1 p-2 rounded-xl bg-[#E23969] pl-4 pr-4 ml-auto whitespace-nowrap block w-full ${style.includes('max-w-full') ? 'max-w-full' : 'max-w-min'} ` + style

    if (!isEnabled) {
        return (
            <span className={`${buttonStyle} opacity-50 `}>
                {text}
            </span>)
    }

    if (isPending) {
        return (
            <span className={`p-2 rounded-xl bg-[#3c284a] ml-auto pl-4 pr-4 animate-pulse text-purple-300 whitespace-nowrap w-full ${style.includes('max-w-full') ? 'max-w-full' : 'max-w-min'} ${style}`}>{text}</span>
        )
    }

    return (
        <span onClick={onClick} className={buttonStyle}>
            {text}
        </span>)

};

export default Button;