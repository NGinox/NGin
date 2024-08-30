import BottomNav from "./components/BottomNav.tsx";
import useSubscriberData from "./hooks/useSubscriberData.tsx";
import {
    DELAY_OF_INCREASING_OF_ENERGY,
    ENERGY_TO_INCREASE,
    MAX_AUTOBOT_MINING_TIME_HOURS
} from "./constants/constants.ts";
import useAppStore from "./hooks/useAppStore.ts";
import {useEffect, useState} from "react";
import HandleLoadingAndError from "./components/HandleLoadingAndError.tsx";
import toast, {Toaster} from "react-hot-toast";
import {Outlet} from "react-router-dom";
import SubscriberService from "./services/subscriber.service.ts";
import {Sheet} from "react-modal-sheet";
import Button from "./ui/Button.tsx";
import {StyledSheet} from "./ui/StyledSheet.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {io} from "socket.io-client";
const App = () => {

    // --- Get subscriber data before the launch of application ---

    const {subscriber, isLoading, isError} = useSubscriberData()

    const [firstOnMount, setFirstOnMount] = useState(true)
    const [minedTokensSheetIsOpen, setMinedTokensSheetIsOpen] = useState(false)
    const [minedTokensUpdateIsPending, setMinedTokensUpdateIsPending] = useState(false)
    const [minedTokens, setMinedTokens] = useState(0)

    const queryClient = useQueryClient()

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

            // Tokens mining

            const currentTime = new Date(Date.now());
            const lastOnlineTime = new Date(subscriber.lastOnline);

            const difference = Math.abs(currentTime.getTime() - lastOnlineTime.getTime());
            const maxDifference = MAX_AUTOBOT_MINING_TIME_HOURS * 60 * 60 * 1000;
            const differenceInMinutes =  Math.min(difference, maxDifference) / (60 * 1000);

            if (firstOnMount) {
                if (Math.floor(subscriber.currentAutoBotLevel.tokensPerHour / 60 * differenceInMinutes) > 0) {
                    setMinedTokensSheetIsOpen(true)
                    setMinedTokens(Math.floor(subscriber.currentAutoBotLevel.tokensPerHour / 60 * differenceInMinutes))
                    setFirstOnMount(false)
                }
            }

            // Logic that allow make onUnmount operations as tg web app don't recognize ny unmount events, the necessary data is sent on connection and in the server side on disconnect the actions are performed
            const socket = io(import.meta.env.VITE_REACT_CLICKER_API_URL);
            socket.on('connect', () => {
                socket.emit('register', {subscriberId: subscriber.user_id});
            });

            return () => {
                clearInterval(interval);
            }
        }
    }, [subscriber]);


    const updateSubscriberTokensWithMined = () => {
        if (subscriber) {
            setMinedTokensUpdateIsPending(true)
            SubscriberService.updateSubscriberTokens(subscriber.user_id, subscriber.tokens + minedTokens).then(() => {
                queryClient.invalidateQueries({queryKey: ['subscriber']}).then(() => {
                    setMinedTokensUpdateIsPending(false)
                    setMinedTokensSheetIsOpen(false)
                    toast.success('Tokens received!')
                })
            })

            setFirstOnMount(false)
        }
    }

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
                    <Outlet context={subscriber}/>
                </div>
                <BottomNav/>
            </div>
            <StyledSheet isOpen={minedTokensSheetIsOpen} onClose={() => setMinedTokensSheetIsOpen(false)} detent={'content-height'}
                         className={`${minedTokensSheetIsOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="flex flex-col items-center text-white font-futuraRegular pb-8 text-center">

                            <div className="text-3xl">Mined tokens 🦾</div>

                            <div className="text-xl mt-4">While you were offline the AutoBot mined some tokens for you! </div>

                            <Button
                                text={"Collect " + minedTokens}
                                style={"text-2xl self-center ml-0 mt-8 max-w-full text-center"}
                                onClick={() => updateSubscriberTokensWithMined()}
                                isPending={minedTokensUpdateIsPending}
                            />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop/>
            </StyledSheet>
        </HandleLoadingAndError>
    );
};


export default App;