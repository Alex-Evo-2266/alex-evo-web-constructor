export function getIn<T = any>(
    obj: T,
    path: string
): any {
    if (!obj || typeof obj !== "object") {
        return undefined
    }

    return path.split(".").reduce((acc: any, key) => {
        if (acc == null) return undefined
        return acc[key]
    }, obj as any)
}

export function setIn<T extends Record<string, any>>(
    obj: T,
    path: string,
    value: unknown
): void {
    const keys = path.split(".")

    let current: any = obj

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]

        if (
            current[key] == null ||
            typeof current[key] !== "object"
        ) {
            current[key] = {}
        }

        current = current[key]
    }

    current[keys[keys.length - 1]] = value
}