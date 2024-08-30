import UpgradeTapLevel from "./upgradeItems/UpgradeTapLevel.tsx";
import UpgradeMaxEnergyLevel from "./upgradeItems/UpgradeMaxEnergyLevel.tsx";
import AnimatedLayout from "../AnimatedLayout.tsx";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
import UpgradeAutoBotLevel from "./upgradeItems/UpgradeAutoBotLevel.tsx";
import UpgradeBoxSkeleton from "./layouts/UpgradeBoxSkeleton.tsx";
const Upgrade = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    return (
        <AnimatedLayout>
            <div className="flex-1 flex flex-col max-h-full">
                <div className="text-3xl pb-4 text-center">
                    <div className="inline-block relative">
                        Upgrade
                        <span className="absolute ml-2"> 🚀</span>
                    </div>
                </div>
                <div className="text-xs text-center font-futuraRegular">
                    <span className="text-xs">Here you can upgrade the power of your finger!</span>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 pb-4">

                    <UpgradeTapLevel
                        upgradeInfo={subscriber.currentLevel}
                        subscriberId={subscriber.user_id}/>

                    <UpgradeBoxSkeleton/>

                    <UpgradeMaxEnergyLevel
                        upgradeInfo={subscriber.currentMaxEnergyLevel}
                        subscriberId={subscriber.user_id}/>

                    <UpgradeAutoBotLevel
                        upgradeInfo={subscriber.currentAutoBotLevel}
                        subscriberId={subscriber.user_id}
                    />

                </div>

            </div>
        </AnimatedLayout>


    );
};

export default Upgrade;