import { useMemo } from "react"
import { useSyncExternalStore } from "react"
import { useDashboard } from "../providers/DashboardProvider"
import { DataResolver } from "../core/data/resolver"

export function useResolvedData(node: any) {
    const { store } = useDashboard()

    // 1. resolver всегда создаётся одинаково
    const resolver = useMemo(() => {
        return new DataResolver(store)
    }, [store])

    // 2. ВСЕГДА вычисляем результат (без условий)
    const result = useMemo(() => {
        return resolver.resolve(node ?? null)
    }, [resolver, node])

    // 3. стабильные deps (даже если пустые)
    const deps = result?.deps ?? []

    // 4. subscribe ВСЕГДА вызывается
    return useSyncExternalStore(
        (cb) => {
            if (deps.size === 0) {
                return () => {}
            }

            return store.subscribeMany(Array.from(deps), cb)
        },
        () => {
            const data = resolver.resolve(node)
            return data.value
        },
        () => undefined
    )
}