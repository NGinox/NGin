import axios, {AxiosResponse} from "axios";

const URL = import.meta.env.VITE_REACT_API_LOCALHOST
export const getUserDataFromBot = async (userId: number): Promise<Subscriber> => {
    try {
        const response: AxiosResponse<Subscriber> = await axios.post(URL + "/api/subs/one", {user_id: userId})
        return response.data
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}