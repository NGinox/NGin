import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SubscriberService from "../services/subscriber.service.ts";
import WebApp from "@twa-dev/sdk";

const useSubscriberData = () => {
    const [subscriberId, setSubscriberId] = useState<number>(0);

    const { data: subscriber, isLoading, isError, error } = useQuery<Subscriber>({
            queryKey: ['subscriber', subscriberId],
            queryFn: () => SubscriberService.getSubscriberData(subscriberId),
            enabled: subscriberId !== 0,
        }
    );

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setSubscriberId(WebApp.initDataUnsafe.user.id);

            WebApp.expand();
            WebApp.setHeaderColor("#000");
            WebApp.setBackgroundColor("#271732");
        } else {
            // For local testing
            setSubscriberId(import.meta.env.VITE_REACT_DEFAULT_USER_ID);
        }
    }, []);

    return { subscriber, isLoading, isError, error };
};

export default useSubscriberData;