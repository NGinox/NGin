interface Subscriber {
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

interface ClickerSubscriber {
    name: string;
    _id: number;
    currentLevel: {
        grade: number;
        tokensPerClick: number;
        levelUpgradeCost: number;
    }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CombinedSubscriberData extends Subscriber, ClickerSubscriber {}