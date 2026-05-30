export type DataValue = unknown

type Subscriber<T=DataValue> = (
    value: T,
) => void

export class DataStore<T = DataValue> {
    private data = new Map<
        string,
        T
    >()

    private subscribers = new Map<
        string,
        Set<Subscriber<T>>
    >()

    get<T = unknown>(
        path: string,
    ): T | undefined {
        return this.data.get(path) as T
    }

    set(
        path: string,
        value: T,
    ) {
        console.log("set", path, value)
        this.data.set(path, value)

        const subscribers =
            this.subscribers.get(path)

        if (!subscribers) {
            return
        }

        subscribers.forEach(callback => {
            callback(value)
        })
    }

    subscribe(
        path: string,
        callback: Subscriber<T>,
    ): () => void {
        if (
            !this.subscribers.has(path)
        ) {
            this.subscribers.set(
                path,
                new Set(),
            )
        }

        this.subscribers
            .get(path)!
            .add(callback)

        return () => {
            this.subscribers
                .get(path)
                ?.delete(callback)
        }
    }
}