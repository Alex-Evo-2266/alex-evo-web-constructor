import { useSyncExternalStore } from "react"
import { useDashboard } from "../providers/DashboardProvider"
import { NodeId } from "../types/schema"

export function useBlock(id: NodeId) {
    const { blocks } = useDashboard()

    return useSyncExternalStore(
        (cb) => blocks.subscribe(id, cb),
        () => blocks.get(id),
        () => undefined,
    )
}