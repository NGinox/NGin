import {Outlet} from "react-router-dom";
import BottomNav from "./BottomNav.tsx";
import useSubscriberData from "../hooks/useSubscriberData.tsx";
import {MAX_ENERGY} from "../constants/constants.ts";
import useAppStore from "../hooks/useAppStore.ts";
import {useEffect} from "react";

const App = () => {

    // --- Get subscriber data before the launch of application ---

    const {subscriber, isLoading, isError} = useSubscriberData()

    useEffect(() => {
        const interval = setInterval(() => {
            if(useAppStore.getState().energy < MAX_ENERGY) {
                useAppStore.getState().increaseEnergy(1)
            }
        }, 200); // Restore 1 energy point every half second

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if(subscriber) {
            useAppStore.getState().updateTokens(subscriber.tokens)
        }
    }, [subscriber]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }







    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-[#000] to-[#271732] flex flex-col items-center text-white font-medium">
            <div id="clicker" className="flex-grow flex flex-col w-full">
                <Outlet/>
            </div>
            <BottomNav/>
        </div>

    );
};



export default App;