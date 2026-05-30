import { Subscriber } from "../../types/dataStore"
import { getIn, setIn } from "./utils"

type ComputedFn = (get: (path: string) => unknown) => unknown

export class DataStore {
    private data: Record<string, unknown> = {}

    private subscribers = new Map<string, Set<Subscriber>>()

    private computed = new Map<string, ComputedFn>()

    private computedCache = new Map<string, unknown>()

    private dependencyMap = new Map<string, Set<string>>() // computedPath -> dependencies

    // ---------------------------
    // RAW DATA
    // ---------------------------

    get(path: string) {
        if (this.computedCache.has(path)) {
            return this.computedCache.get(path)
        }

        return getIn(this.data, path)
    }

    set(path: string, value: unknown) {
        setIn(this.data, path, value)
        console.log(path, value, this.data)

        this.notify(path)

        this.recomputeDependents(path)
    }

    // ---------------------------
    // SUBSCRIPTIONS
    // ---------------------------

    subscribe(path: string, cb: Subscriber) {
        if (!this.subscribers.has(path)) {
            this.subscribers.set(path, new Set())
        }

        this.subscribers.get(path)!.add(cb)

        return () => {
            this.subscribers.get(path)?.delete(cb)
        }
    }

    subscribeMany(paths: string[], cb: (value: any) => void) {
        const unsubs: Array<() => void> = []

        for (const path of paths) {
            const unsub = this.subscribe(path, cb)
            unsubs.push(unsub)
        }

        return () => {
            unsubs.forEach(u => u())
        }
    }

    private notify(path: string) {
        const value = this.get(path)

        this.subscribers.get(path)?.forEach(cb => cb(value))
        console.log(path, this.subscribers)

        // notify parent paths (devices.lamp1.state -> devices.lamp1 -> devices)
        const parts = path.split(".")

        for (let i = parts.length - 1; i > 0; i--) {
            const parent = parts.slice(0, i).join(".")

            const parentValue = this.get(parent)

            this.subscribers.get(parent)?.forEach(cb => cb(parentValue))
        }
    }

    // ---------------------------
    // COMPUTED VALUES
    // ---------------------------

    registerComputed(path: string, fn: ComputedFn) {
        this.computed.set(path, fn)

        this.recompute(path)
    }

    private recompute(path: string) {
        const fn = this.computed.get(path)

        if (!fn) return

        const accessed = new Set<string>()

        const proxyGet = (p: string) => {
            accessed.add(p)
            return this.get(p)
        }

        const value = fn(proxyGet)

        this.computedCache.set(path, value)
        this.dependencyMap.set(path, accessed)

        this.notify(path)
    }

    private recomputeDependents(changedPath: string) {
        for (const [computedPath, deps] of this.dependencyMap.entries()) {
            if (deps.has(changedPath)) {
                this.recompute(computedPath)
            }
        }
    }

    // ---------------------------
    // DEBUG
    // ---------------------------

    dump() {
        return {
            data: this.data,
            computed: Object.fromEntries(this.computedCache),
            deps: Object.fromEntries(
                [...this.dependencyMap.entries()].map(([k, v]) => [
                    k,
                    [...v],
                ])
            ),
        }
    }
}