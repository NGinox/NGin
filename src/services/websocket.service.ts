import {io} from "socket.io-client";
import {CombinedSubscriberData} from "../types/subscriber.type.ts";
export const initializeWebsocket = (subscriber: CombinedSubscriberData) => {

    // In this app websocket is used for maintain the unload effects, as telegram mini app does not handle any app unmount effects

    const socket = io(import.meta.env.VITE_REACT_CLICKER_API_URL);
    socket.on('connect', () => {
        socket.emit('register', {subscriberId: subscriber.user_id});
    });
}
