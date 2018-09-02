export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    timestamp: number;

    setTimestamp(timestamp?: number): void;
}