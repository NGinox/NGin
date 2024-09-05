import {useEffect} from "react";
import Websocket from "../api/websocket.ts";

const UseConnectWebsocket = () => {

    const connectWebsocket = () => {
        Websocket.createConnection()
    }

    useEffect(() => {
        connectWebsocket()
    }, []);
};

export default UseConnectWebsocket;