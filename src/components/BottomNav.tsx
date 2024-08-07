import {NavLink} from "react-router-dom";

const BottomNav = () => {

    const navLinkStyle = "flex flex-col items-center gap-1 flex-1 p-2 rounded-xl"
    const activeNavLinkStyle = navLinkStyle + " bg-[#E23969]"

    return (
        <div className="flex items-center w-full text-m">
            <div
                className="w-full p-2 gap-2  bg-[#271732] rounded-2xl flex justify-around shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] relative">
                <NavLink className={({ isActive}) =>
                     isActive ? activeNavLinkStyle : navLinkStyle
                } to={'/store'}>
                    <span>Store</span>
                </NavLink>
                <NavLink to={'/'} className={({ isActive}) =>
                    isActive ? activeNavLinkStyle : navLinkStyle
                }>
                    <span>Earn</span>
                </NavLink>
                <NavLink to={'/coming-soon'} className={({ isActive}) =>
                    isActive ? activeNavLinkStyle : navLinkStyle
                }>
                    <span>Upgrade</span>
                </NavLink>
            </div>
        </div>
    );
};

export default BottomNav;