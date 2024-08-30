
const UpgradeBoxSkeleton = () => {
    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-1 w-full">
            <div className="flex items-center gap-4">
                <div className="bg-[#3c284a] animate-pulse w-[40px] h-[40px] rounded-[10px] grid place-items-center"></div>
                <div className="bg-[#3c284a] text-purple-300 animate-pulse h-[20px] w-[80px] rounded-xl"></div>
            </div>
            <div className="flex justify-between items-center mt-2">

                <div className="bg-[#3c284a] text-purple-300 animate-pulse h-[20px] w-[80px] rounded-xl "></div>
                <div
                    className="p-2 rounded-xl bg-[#3c284a] ml-auto pl-4 pr-4 max-w-min animate-pulse text-purple-300 whitespace-nowrap">Level Up</div>
            </div>
        </div>
    );
};

export default UpgradeBoxSkeleton;