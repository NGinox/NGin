import React from "react";
import PaymentService from "../../../services/payment.service.ts";
import useAppStore from "../../../hooks/useAppStore.ts";
import WebApp from "@twa-dev/sdk";
const Store = () => {
    return (
        <div className="flex flex-col">
            <div className="text-3xl pb-4 text-center">Welcome to the store!</div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can buy GPT Tokens for Telegram Stars</span>
                <div>
                    <span className="opacity-50 font-futuraRegular">... or something more later</span>
                    <span> 👀</span>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 pb-4">
                <StoreItem gptTokens={600} description={"3 image generations or huge chat request"} price={15} withTelegramStars={true}/>
                <StoreItem gptTokens={1000} description={"5 image generations or many chat requests"} price={25} withTelegramStars={true}/>
                <StoreItem gptTokens={2000}
                           description={"10 image generations or huge philosophical conversation with chat"}
                           price={50} withTelegramStars={true}/>
                <StoreItem gptTokens={4000}
                           description={"20 image generations or a book written by chat"}
                           price={100} withTelegramStars={true}/>
            </div>

        </div>
    );
};

const StoreItem: React.FC<StoreItemProps> = ({gptTokens, description, price, withTelegramStars = false}) => {

    const handleOnClick = () => {
        PaymentService.sendPayment(gptTokens, price, Number(useAppStore.getState().userId)).then(() => {
            WebApp.close()
        })
    }

    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-2 rounded-xl flex flex-col items-center justify-center gap-2"
        >
            <div className="mt-2 text-4xl">🤖</div>
            <div>{gptTokens} GPT Tokens</div>
            <div className="text-xs opacity-50 text-center">
                {description}
            </div>
            <div className="mt-2"></div>
            <div className="rounded-xl bg-[#E23969] w-full p-1 text-center mt-auto hover:bg-white hover:text-[#E23969] hover:animate-ping transition-all" onClick={handleOnClick}>
                {price} {withTelegramStars ? "Stars" : 'K'}
            </div>
        </div>
    )
}

interface StoreItemProps {
    gptTokens: number;
    description: string;
    price: number;
    withTelegramStars?: boolean
}

export default Store;