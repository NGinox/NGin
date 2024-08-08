import {Outlet} from "react-router-dom";
import BottomNav from "./BottomNav.tsx";
import useSubscriberData from "../hooks/useSubscriberData.tsx";
import {DELAY_OF_INCREASING_OF_ENERGY, ENERGY_TO_INCREASE, MAX_ENERGY} from "../constants/constants.ts";
import useAppStore from "../hooks/useAppStore.ts";
import {useEffect} from "react";
import Loader from "./Loader.tsx";

const App = () => {

    // --- Get subscriber data before the launch of application ---

    const {subscriber, isLoading, isError} = useSubscriberData()

    // --- Save tokens in state ---

    useEffect(() => {
        if(subscriber) {
            useAppStore.getState().updateTokens(subscriber.tokens)
        }
    }, [subscriber]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(useAppStore.getState().energy < MAX_ENERGY) {
                useAppStore.getState().increaseEnergy(ENERGY_TO_INCREASE)
            }
        }, DELAY_OF_INCREASING_OF_ENERGY);

        const getEnergy = (): number => {
            const localEnergy = localStorage.getItem("energy")
            const exitAppTime = localStorage.getItem("exitAppTime")


            if(localEnergy) {
                const currentTimestamp = Date.now();
                const differenceInSeconds = Math.floor((currentTimestamp - Number(exitAppTime)) / 1000)
                const currentEnergy = Number(localEnergy) + differenceInSeconds * ENERGY_TO_INCREASE
                return currentEnergy < MAX_ENERGY ? currentEnergy : MAX_ENERGY
            }

            return MAX_ENERGY
        }

        useAppStore.getState().updateEnergy(getEnergy())

        return () => {
            clearInterval(interval);
        }
    }, []);



    if (isLoading) {
        return (
            <Loader/>
        )
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div
            className="min-h-screen max-h-screen p-4 bg-gradient-to-b from-[#000] to-[#271732] flex flex-col items-center text-white font-futura">
            <div id="clicker" className="flex-grow flex flex-col w-full overflow-auto">
                <Outlet/>
            </div>
            <BottomNav/>
        </div>

    );
};


export default App;