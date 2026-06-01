import { useEffect } from "react"

import { useDashboard }
    from "../providers/DashboardProvider"

export function useEvent(
    type: string,
    callback: (
        payload: unknown,
    ) => void,
) {
    const { events } =
        useDashboard()

    useEffect(() => {
        return events.on(
            type,
            event =>
                callback(
                    event.payload,
                ),
        )
    }, [type])
}