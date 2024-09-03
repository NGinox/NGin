import {Task} from "./task.type.ts";
import {Referral} from "./referral.type.ts";
import {Boosts} from "./boost.type.ts";

export interface Subscriber {
    chat_id: number;
    user_id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code: string;
    mode: string;
    modeGPT: string;
    tokens: number;
    paid_days: number;
    user_id_referral_program?: number;
    quiz_subs_available: number;
    quiz_token_available: number;
    quiz_count: number;
    quiz_reboot_date?: Date;
    MI_count: number;
    GPT_model: string;
    FILES_count: number;
    comment?: string;
    tags?: string;
    tts_voice: string;
}

export interface ClickerSubscriber {
    telegramId: number;
    savedEnergy: number;
    savedEnergyTimestamp: Date;
    lastOnline: Date;
    _id: number;
    currentLevel: {
        grade: number;
        tokensPerClick: number;
        levelUpgradeCost: number;
    },
    currentMaxEnergyLevel: {
        grade: number;
        maxEnergy: number;
        levelUpgradeCost: number;
    },
    currentAutoBotLevel: {
        grade: number;
        tokensPerHour: number;
        levelUpgradeCost: number;
    }
    tasks: Task[],
    myReferral: number,
    referrals: Referral[],
    newReferrals: Referral[],
    boosts: Boosts
}





export interface CombinedSubscriberData extends Subscriber, ClickerSubscriber {}