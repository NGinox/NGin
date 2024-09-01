import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
import BottomSheet from "../../ui/BottomSheet.tsx";

const StatsSheet = ({isOpen, setIsOpen, subscriber} : {isOpen: boolean, setIsOpen: (value: boolean) => void, subscriber: CombinedSubscriberData}) => {

    const completedTasks = subscriber.tasks.filter(task => task.completed)

    return (
        <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center text-white font-futuraRegular pb-8 text-center">

                <div className="text-3xl">
                    Your stats
                    <span className="absolute ml-2"> 🏆</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xl">
                    <div className="flex flex-col items-start">
                        <div>Tokens per click:</div>
                        <div>Max energy:</div>
                        <div>Tokens per hour:</div>
                        <div>Completed tasks:</div>
                        <div>Referrals:</div>
                    </div>
                    <div className="flex flex-col items-start ml-12">
                        <div>{subscriber.currentLevel.tokensPerClick} ({subscriber.currentLevel.grade} Lvl)</div>
                        <div>{subscriber.currentMaxEnergyLevel.maxEnergy} ({subscriber.currentMaxEnergyLevel.grade} Lvl)</div>
                        <div>{subscriber.currentAutoBotLevel.tokensPerHour} ({subscriber.currentAutoBotLevel.grade} Lvl)</div>
                        <div>{completedTasks.length}/{subscriber.tasks.length}</div>
                        <div>{subscriber.referrals.length}</div>
                    </div>
                </div>


                {/* referral */}
            </div>
        </BottomSheet>


    );
};

export default StatsSheet;