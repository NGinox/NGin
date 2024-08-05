import axios, {AxiosResponse} from "axios";

const URL = import.meta.env.VITE_REACT_API_URL + "/api/subs/"
const URLTEST = "http://localhost:3000" + "/api/subs/"
export const getUserDataFromBot = async (userId: number): Promise<Subscriber> => {
    try {
        const response: AxiosResponse<Subscriber> = await axios.post(URL + "one", {user_id: userId})
        return response.data
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}

export const updateSubscriberTokens = async (userId: number, tokens: number): Promise<Subscriber> => {
    try {
        console.log(userId + " " + tokens)
        const response: AxiosResponse<Subscriber> = await axios.post(URL + "update-tokens", {
            user_id: userId,
            tokens: tokens
        })
        return response.data
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}

