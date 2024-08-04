export type IconProps = {
    size?: number;
    className?: string;
}

export interface UserData  {
    id: number;
    first_name: string;
    last_name?: string;
    language_code: string;
    is_premium?: boolean;
}