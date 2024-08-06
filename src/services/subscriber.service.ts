import {AxiosResponse} from "axios";
import axiosInstance from "../api/interceptors.ts";
class SubscriberService {
    private BASE_URL = "/subs"

    async getSubscriberData(subscriberId: number): Promise<Subscriber> {
        const response: AxiosResponse<Subscriber> = await axiosInstance.post(this.BASE_URL + "/one", {user_id: subscriberId})
        return response.data
    }

    async updateSubscriberTokens(subscriberId: number, tokens: number) {
        await axiosInstance.post(this.BASE_URL + "/update-tokens", {
            user_id: subscriberId,
            tokens: tokens
        })
    }
}

export default new SubscriberService()

