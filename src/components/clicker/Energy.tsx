import {highVoltage} from "../../images";

const Energy = ({ energy, maxEnergy}: EnergyProps) => {
    return (
        <>
            <div className="w-full flex flex-row items-center" style={{fontFamily: 'Futura, sans-family'}}>
                <img src={highVoltage} width={32} height={32} alt="High Voltage"/>
                <div className="flex flex-row items-center ml-auto">
                    <div className="text-white text-xl font-bold">{energy} / <span
                        className="opacity-50 ">{maxEnergy}</span>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#18091c] rounded-full mt-2">
                <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
                     style={{width: `${(energy / maxEnergy) * 100}%`}}></div>
            </div>
        </>
    )
};

type EnergyProps = {
    energy: number;
    maxEnergy: number;
}

export default Energy;