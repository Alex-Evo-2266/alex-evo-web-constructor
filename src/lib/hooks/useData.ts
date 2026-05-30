import {
    useEffect,
    useState,
} from "react"

import { useDashboard }
    from "../providers/DashboardProvider"

export function useData<T>(
    path: string | undefined,
): T | undefined {
    const { store } =
        useDashboard()

    const [value, setValue] =
        useState<T | undefined>(
            store.get(path ?? ""),
        )

    useEffect(() => {
        if(path !== undefined)
            return store.subscribe(
                path,
                value =>
                    setValue(
                        value as T,
                    ),
            )
    }, [path])

    if(path === undefined)
        return undefined

    return value
}