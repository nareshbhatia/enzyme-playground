export type TickerCallback = (ticker: string) => void;

export class TickerPublisher {
    static subscribe = (callback: TickerCallback) => {
        // TODO: calls the callback function whenever a new ticker is published
    };
}
