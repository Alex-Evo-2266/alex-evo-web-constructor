import { useMemo } from "react"
import { useSyncExternalStore } from "react"
import { useDashboard } from "../providers/DashboardProvider"
import { DataResolver, ResolveResult } from "../core/data/resolver"
import { DataNode } from "../types/dataStore"

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

export function useResolvedDataMany(datas: Record<string, DataNode> | undefined) {
    const { store } = useDashboard()

    // 1. resolver всегда создаётся одинаково
    const resolver = useMemo(() => {
        return new DataResolver(store)
    }, [store])

    function resolv():[string, ResolveResult][] | undefined{
        if(datas === undefined)
            return undefined
        return Object.entries(datas).map(([key, node])=>{
            return [key, resolver.resolve(node ?? null)]
        })
    }

    // 2. ВСЕГДА вычисляем результат (без условий)
    const result = useMemo(resolv, [resolver, datas])

    // 3. стабильные deps (даже если пустые)
    const deps = result && result.reduce((acc, item)=>{
        item[1].deps.forEach(dep=>acc.add(dep))
        return acc
    },new Set<string>())

    // 4. subscribe ВСЕГДА вызывается
    return useSyncExternalStore(
        (cb) => {
            if (deps === undefined || deps.size === 0) {
                return () => {}
            }

            return store.subscribeMany(Array.from(deps), cb)
        },
        () => {
            const data = resolv()
            return data && Object.fromEntries(data.map(item=>[item[0],item[1].value]))
        },
        () => undefined
    )
}