import axios, {AxiosResponse} from "axios";

const URL = import.meta.env.VITE_REACT_API_URL
export const getUserDataFromBot = async (userId: number): Promise<Subscriber> => {
    console.log('API URL ------> ', URL)
    try {
        const response: AxiosResponse<Subscriber> = await axios.post(URL + "/api/subs/one", {user_id: userId})
        return response.data
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}