export declare const askAi: (message: string, history?: {
    by: 'bot' | 'user';
    text: string;
}[]) => Promise<string>;
