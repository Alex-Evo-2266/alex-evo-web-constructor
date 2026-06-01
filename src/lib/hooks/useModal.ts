import { useSyncExternalStore } from "react"

import { useDashboard } from "../providers/DashboardProvider"

export function useModal() {
    const { modals } = useDashboard()

    const optional =
        useSyncExternalStore(
            cb => modals.subscribe(cb),
            () => modals.getCurrent(),
            () => undefined,
        )

    const template =
        useSyncExternalStore(
            cb => modals.subscribe(cb),
            () => modals.getTemplate(),
            () => undefined,
        )

    return {
        optional,
        template,
        open:
            modals.open.bind(modals),
        close:
            modals.close.bind(modals),
    }
}