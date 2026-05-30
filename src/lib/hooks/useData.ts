import { useSyncExternalStore } from "react"
import { useDashboard } from "../providers/DashboardProvider"

export function useData<T = any>(path?: string): T | undefined {
    const { store } = useDashboard()

    return useSyncExternalStore(
        (cb) => {
            if (!path) return () => {}

            return store.subscribe(path, cb)
        },
        () => {
            if (!path) return undefined

            return store.get(path)
        },
        () => undefined
    )
}