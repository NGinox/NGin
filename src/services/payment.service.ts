import {AxiosResponse} from "axios";
import axiosInstance from "../api/interceptors.ts";

class PaymentService {
    private BASE_URL = "/payment"

    async sendPayment(tokens: number, price: number): Promise<Subscriber> {
        const response: AxiosResponse<Subscriber> = await axiosInstance.post(this.BASE_URL, {tokens: tokens, price: price})
        return response.data
    }
}

export default new PaymentService()