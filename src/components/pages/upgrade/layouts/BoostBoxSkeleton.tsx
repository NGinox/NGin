import Button from "../../../../ui/Button.tsx";

const BoostBoxSkeleton = () => {
    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col">
            <div className="flex flex-col items-center gap-2 mb-2">
                <div className="bg-[#3c284a] animate-pulse w-[40px] h-[40px] rounded-[10px] grid place-items-center flex-grow">
                    <div className="text-2xl bg-[#3c284a] animate-pulse"></div>
                </div>
                <div className="bg-[#3c284a] animate-pulse h-4 w-24 rounded-xl mt-1"></div>
            </div>
            <Button text={'Boost'} style={"max-w-full text-center p-1 mt-auto"} isPending={true} />
        </div>
    );
};

export default BoostBoxSkeleton;