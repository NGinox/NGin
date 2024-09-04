import axios, {AxiosResponse} from "axios";
import axiosInstance from "../api/interceptors.ts";
import {ClickerSubscriber, CombinedSubscriberData, Subscriber} from "../types/subscriber.type.ts";
import {Task} from "../types/task.type.ts";
import {Boosts} from "../types/boost.type.ts";
class SubscriberService {

    private BASE_URL = "/subs"

    async getSubscriberData(subscriberId: number): Promise<CombinedSubscriberData> {
        try {
            // First API call to get subscriber data
            const response: AxiosResponse<Subscriber> = await axiosInstance.post(this.BASE_URL + "/one", {
                user_id: subscriberId,
            });

            const subscriber = response.data;

            // Second API call to get additional data
            const additionalDataResponse: AxiosResponse<ClickerSubscriber> = await axios.get(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/${subscriber.user_id}`,
            );

            const additionalData = additionalDataResponse.data;

            // Combine the responses into one object
            return <CombinedSubscriberData> {
                ...subscriber,
                ...additionalData
            };

        } catch (error) {
            throw new Error('Failed to fetch subscriber data');
        }
    }

    async getClickerLevels() {
        return axios.get(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/level`,
        ).then(res => res.data)
    }

    async getMaxEnergyLevels() {
        return axios.get(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/max-energy-level`,
        ).then(res => res.data)
    }

    async getAutoBotLevels() {
        return axios.get(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/auto-bot-level`,
        ).then(res => res.data)
    }

    async getTasks(): Promise<Task[]> {
        return axios.get(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/task`
        ).then(res => res.data)
    }

    async completeTask(taskId: string, telegramId: number, reward: number): Promise<ClickerSubscriber> {
        return this.updateSubscriberTokens(telegramId, reward).then(() =>
            axios.post(
                import.meta.env.VITE_REACT_CLICKER_API_URL + '/task/complete', {
                    taskId,
                    telegramId
                })
        )
    }

    async updateSubscriberTokens(subscriberId: number, tokens: number) {
        await axiosInstance.post(this.BASE_URL + "/update-tokens", {
            user_id: subscriberId,
            tokens: tokens
        })
    }

    async syncSubscriberData(subscriberId: number, tokens: number, energy: number) {
        await axiosInstance.post(this.BASE_URL + "/update-tokens", {
            user_id: subscriberId,
            tokens: tokens
        }).then(() => {
            axios.patch(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/update-energy`,
                {
                    telegramId: subscriberId,
                    energy: energy
                }
            )
        })
    }

    async updateClickerLevel(subscriberId: number, levelUpgradeCost: number) {
        return axiosInstance.put(this.BASE_URL + "/remove-tokens", {
            user_id: subscriberId,
            tokensToRemove: levelUpgradeCost
        }).then(() =>
            axios.put(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/upgrade-level`,
                {
                    telegramId: subscriberId
                }
            )
        )
    }

    async updateSubscriberMaxEnergy(subscriberId: number, levelUpgradeCost: number) {
        return axiosInstance.put(this.BASE_URL + "/remove-tokens", {
            user_id: subscriberId,
            tokensToRemove: levelUpgradeCost
        }).then(() =>
            axios.patch(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/upgrade-max-energy`,
                {
                    telegramId: subscriberId
                }
            )
        )
    }

    async updateSubscriberAutoBotLevel(subscriberId: number, levelUpgradeCost: number) {
        return axiosInstance.put(this.BASE_URL + "/remove-tokens", {
            user_id: subscriberId,
            tokensToRemove: levelUpgradeCost
        }).then(() =>
            axios.patch(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/upgrade-auto-bot-level`,
                {
                    telegramId: subscriberId
                }
            )
        )
    }

    async updateSubscriberLastOnline(subscriberId: number, lastOnline: Date) {
        return axios.patch(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/update-last-online`,
            {
                telegramId: subscriberId,
                lastOnline: lastOnline
            }
        )
    }

    async verifyMemberOfChat(chatId: number | string, userId: number) {
        return axios.post(
            `https://api.telegram.org/bot${import.meta.env.VITE_REACT_TELEGRAM_API}/getChatMember`, {
                chat_id: chatId,
                user_id: userId
            }
        ).then(res => res.data)
    }

    async addReferral(subscriberId: number, referralId: number) {
        return axios.post(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/add-referral`,
            {
                telegramId: subscriberId,
                referralId: referralId
            }
        )
    }

    async getReferralReward(subscriberId: number, tokens: number) {
        await axiosInstance.post(this.BASE_URL + "/update-tokens", {
            user_id: subscriberId,
            tokens: tokens
        }).then(() => {
            axios.post(
                import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/get-referral-reward`,
                {
                    telegramId: subscriberId,
                }
            )
        })
    }

    async updateSubscriberBoosts(subscriberId: number, boosts: Boosts) {
        return axios.patch(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/user/update-boosts`,
            {
                telegramId: subscriberId,
                boosts: boosts
            }
        ).then(res => res.data)
    }

    async downloadTelegramGroupProfileImage(telegramImagePath: string, telegramGroupName: string) {
        return axios.post(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/image`,
            {
                telegramImagePath,
                telegramGroupName
            }
        ).then(res => res.data)
    }

    async getTelegramGroupProfileImage(telegramGroupName: string) {
        return axios.get(
            import.meta.env.VITE_REACT_CLICKER_API_URL + `/images/${telegramGroupName}.jpg`,
        ).then(res => res.data)
    }
}

export default new SubscriberService()

