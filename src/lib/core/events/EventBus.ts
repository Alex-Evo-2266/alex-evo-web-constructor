import { DashboardEvent } from "../../types/event"

type EventCallback = (
    event: DashboardEvent
) => void

export class EventBus {
    private listeners = new Map<
        string,
        Set<EventCallback>
    >()

    emit(event: DashboardEvent) {
        const callbacks =
            this.listeners.get(event.type)

        if (!callbacks) {
            return
        }

        callbacks.forEach(callback => {
            callback(event)
        })
    }

    on(
        type: string,
        callback: EventCallback,
    ): () => void {
        if (!this.listeners.has(type)) {
            this.listeners.set(
                type,
                new Set(),
            )
        }

        this.listeners
            .get(type)!
            .add(callback)

        return () => {
            this.listeners
                .get(type)
                ?.delete(callback)
        }
    }

    clear() {
        this.listeners.clear()
    }
}