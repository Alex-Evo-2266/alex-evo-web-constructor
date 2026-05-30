import { ExpressionEvaluator } from "./evaluator"

export type ResolveResult = {
    value: any
    deps: Set<string>
}

export class DataResolver {
    constructor(private store: any) {}

    resolve(node: any): ResolveResult {
        const deps = new Set<string>()

        const value = this.resolveNode(node, deps)

        return {
            value,
            deps,
        }
    }

    private resolveNode(node: any, deps: Set<string>): any {
        const getData =(path: string):string => {
            deps.add(path)
            return this.store.get(path)
        }
        
        if (node == null) return undefined

        // primitive
        if (typeof node !== "object") {
            return node
        }

        // binding
        if ("binding" in node) {
            deps.add(node.binding)
            return this.store.get(node.binding)
        }

        // expression
        if ("expression" in node) {
            const ev = new ExpressionEvaluator(getData)
            return ev.evaluate(node.expression)
        }

        return node
    }


}