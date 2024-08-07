import {Outlet} from "react-router-dom";
import BottomNav from "./BottomNav.tsx";
import useSubscriberData from "../hooks/useSubscriberData.tsx";
import {MAX_ENERGY} from "../constants/constants.ts";
import useAppStore from "../hooks/useAppStore.ts";
import {useEffect} from "react";
import {MutatingDots} from "react-loader-spinner";

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
                useAppStore.getState().increaseEnergy(1)
            }
        }, 1000); // Restore 1 energy point every half second

        return () => {
            clearInterval(interval);
        }
    }, []);



    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000] to-[#271732]">
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="rgba(226,57,105,0.7)"
                    secondaryColor="rgba(226,57,105,0.7)"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-[#000] to-[#271732] flex flex-col items-center text-white font-futura">
            <div id="clicker" className="flex-grow flex flex-col w-full">
                <Outlet/>
            </div>
            <BottomNav/>
        </div>

    );
};



export default App;