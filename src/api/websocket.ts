import {io, Socket} from "socket.io-client";

class Websocket {
    static socket: null | Socket = null

    static createConnection() {
        this.socket = io(import.meta.env.VITE_REACT_CLICKER_API_URL)
        this.socket.on("connect", () => {

        })
    }

    static sendUserId(userId: number) {
        this.socket?.emit('saveUserId', {userId})
    }

    static syncTokensAndEnergy(tokens: number, energy: number) {
        this.socket?.emit('syncTokensAndEnergy', {tokens, energy})
    }
}

export default Websocket