import UpgradeTapLevel from "./upgradeItems/UpgradeTapLevel.tsx";
import UpgradeMaxEnergyLevel from "./upgradeItems/UpgradeMaxEnergyLevel.tsx";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";
const Upgrade = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="text-3xl pb-4 pt-2 text-center">
                <span className="inline-block">Upgrade</span>
                <span className="ml-2 inline-block align-middle absolute">🚀</span>
            </div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can upgrade the power of your finger!</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 pb-4">

                <UpgradeTapLevel upgradeInfo={subscriber.currentLevel} subscriberId={subscriber.user_id}/>
                <UpgradeMaxEnergyLevel upgradeInfo={subscriber.currentMaxEnergyLevel} subscriberId={subscriber.user_id}/>

            </div>

        </div>
    );
};

export default Upgrade;