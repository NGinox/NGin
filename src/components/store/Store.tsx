import React from "react";
const Store = () => {
    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="text-2xl py-4 text-center">Welcome to the store!</div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can buy GPT Tokens for Tap Coins</span>
                <div>
                    <span className="opacity-50 font-futuraRegular">... or something more later</span>
                    <span> 👀</span>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                <StoreItem gptTokens={200} description={"1 image generation or small chat request"} price={2}/>
                <StoreItem gptTokens={600} description={"3 image generations or huge chat request"} price={6}/>
                <StoreItem gptTokens={1000} description={"5 image generations or many chat requests"} price={10}/>
                <StoreItem gptTokens={2000}
                           description={"10 image generations or huge philosophical conversation with chat"}
                           price={20}/>
            </div>
            <div className="text-xl mt-8 text-center ">
                Not enough Tap Coins?
                <div className="text-xs mt-2">Buy GPT Tokens for Telegram Stars</div>
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
    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-2 rounded-xl flex flex-col items-center justify-center gap-2 h-full">
            <div className="mt-2 text-4xl">🤖</div>
            <div>{gptTokens} GPT Tokens</div>
            <div className="text-xs opacity-50 text-center">
                {description}
            </div>
            <div className="mt-2"></div>
            <div className="rounded-xl bg-[#E23969] w-full p-1 text-center mt-auto">
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