export interface Task {
    _id: string;
    title: string;
    description: string;
    reward: number;
    type: TaskType;
    link: string;
    iconUrl: string;
    completed: boolean;

}

export enum TaskType {
    telegramGroup = "telegramGroup"
}