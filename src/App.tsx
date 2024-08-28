import BottomNav from "./components/BottomNav.tsx";
import useSubscriberData from "./hooks/useSubscriberData.tsx";
import {DELAY_OF_INCREASING_OF_ENERGY, ENERGY_TO_INCREASE} from "./constants/constants.ts";
import useAppStore from "./hooks/useAppStore.ts";
import {useEffect} from "react";
import HandleLoadingAndError from "./components/HandleLoadingAndError.tsx";
import {Toaster} from "react-hot-toast";
import AnimatedOutlet from "./components/AnimatedOutlet.tsx";

const App = () => {

    // --- Get subscriber data before the launch of application ---

    const {subscriber, isLoading, isError} = useSubscriberData()

    // --- Save tokens in state ---

    useEffect(() => {
        if(subscriber) {
            useAppStore.getState().updateTokens(subscriber.tokens)

            const maxEnergy = subscriber.currentMaxEnergyLevel.maxEnergy

            const interval = setInterval(() => {
                if(useAppStore.getState().energy < maxEnergy) {
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

                    return currentEnergy < maxEnergy ? currentEnergy : maxEnergy
                }

                return maxEnergy
            }

            useAppStore.getState().updateEnergy(getEnergy())

            return () => {
                clearInterval(interval);
            }
        }
    }, [subscriber]);


    return (
        <HandleLoadingAndError isLoading={isLoading} isError={isError}>
            <div><Toaster
                toastOptions={{
                    className: '',
                    style: {
                        backgroundColor: '#3c284a',
                        color: '#fff',
                        fontFamily: 'Futura'
                    },
                    success: {
                        iconTheme: {
                            primary: '#E23969',
                            secondary: '#fff',
                        },
                    },
                }}/></div>
            <div
                className="min-h-screen max-h-screen p-4 bg-gradient-to-b from-[#000] to-[#271732] flex flex-col items-center text-white font-futura">
                <div id="clicker" className="flex-grow flex flex-col w-full overflow-auto">
                    <AnimatedOutlet context={subscriber!}/>
                </div>
                <BottomNav/>
            </div>
        </HandleLoadingAndError>
    );
};


export default App;