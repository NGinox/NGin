import {NavLink} from "react-router-dom";
import {bear, coin, rocket} from "../images";

const BottomNav = () => {
    return (
        <div className="flex items-center w-full text-sm">
            <div
                className="w-full bg-[#271732] py-4 rounded-2xl flex justify-around shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] relative">
                <NavLink className="flex flex-col items-center gap-1" to={'/'}>
                    <img src={bear} width={24} height={24} alt="High Voltage"/>
                    <span>Frens</span>
                </NavLink>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <NavLink to={'/store'} className="flex flex-col items-center gap-1">
                    <img src={coin} width={24} height={24} alt="High Voltage"/>
                    <span>Earn</span>
                </NavLink>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                    <img src={rocket} width={24} height={24} alt="High Voltage"/>
                    <span>Boosts</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;