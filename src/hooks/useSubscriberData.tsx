import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SubscriberService from "../services/subscriber.service.ts";
import WebApp from "@twa-dev/sdk";
import useAppStore from "./useAppStore.ts";

const useSubscriberData = () => {
    const [subscriberId, setSubscriberId] = useState<number | null >(null);

    const { data: subscriber, isLoading, isError, error } = useQuery<CombinedSubscriberData>({
            queryKey: ['subscriber', subscriberId],
            queryFn: () => {
                if (subscriberId) {
                    return SubscriberService.getSubscriberData(subscriberId);
                }
                throw new Error('No subscriber data available');
            },
            enabled: subscriberId !== 0,
        }
    );

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setSubscriberId(WebApp.initDataUnsafe.user.id);
            useAppStore.getState().updateUserId(WebApp.initDataUnsafe.user.id)
            WebApp.expand();
            WebApp.setHeaderColor("#000");
            WebApp.setBackgroundColor("#271732");
            WebApp.disableVerticalSwipes()
        } else {
            // For local testing
            useAppStore.getState().updateUserId(import.meta.env.VITE_REACT_DEFAULT_USER_ID)
            setSubscriberId(import.meta.env.VITE_REACT_DEFAULT_USER_ID);
        }
    }, []);

    return { subscriber, isLoading, isError, error };
};

export default useSubscriberData;