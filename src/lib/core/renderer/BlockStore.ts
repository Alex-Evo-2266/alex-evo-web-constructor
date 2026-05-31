import { NodeId, WidgetSchema } from "../../types/schema"

type Subscriber = () => void

export class BlockStore {
    private blocks = new Map<
        NodeId,
        WidgetSchema
    >()

    private subscribers = new Map<
        NodeId,
        Set<Subscriber>
    >()

    constructor(
        initialBlocks?: Record<
            NodeId,
            WidgetSchema
        >,
    ) {
        if (initialBlocks) {
            Object.entries(
                initialBlocks,
            ).forEach(
                ([id, block]) => {
                    this.blocks.set(
                        id,
                        block,
                    )
                },
            )
        }
    }

    get(
        id: NodeId,
    ): WidgetSchema | undefined {
        return this.blocks.get(id)
    }

    getAll(): Record<
        NodeId,
        WidgetSchema
    > {
        return Object.fromEntries(
            this.blocks,
        )
    }

    set(
        id: NodeId,
        block: WidgetSchema,
    ) {
        this.blocks.set(id, block)

        this.notify(id)
    }

    update(
        id: NodeId,
        updater: (
            block: WidgetSchema,
        ) => WidgetSchema,
    ) {
        const current =
            this.blocks.get(id)

        if (!current) {
            return
        }

        const next =
            updater(current)

        this.blocks.set(id, next)

        this.notify(id)
    }

    patch(
        id: NodeId,
        patch: Partial<WidgetSchema>,
    ) {
        const current =
            this.blocks.get(id)

        if (!current) {
            return
        }

        this.blocks.set(id, {
            ...current,
            ...patch,
        })

        this.notify(id)
    }

    delete(id: NodeId) {
        this.blocks.delete(id)

        this.notify(id)
    }

    subscribe(
        id: NodeId,
        callback: Subscriber,
    ): () => void {
        if (
            !this.subscribers.has(id)
        ) {
            this.subscribers.set(
                id,
                new Set(),
            )
        }

        this.subscribers
            .get(id)!
            .add(callback)

        return () => {
            this.subscribers
                .get(id)
                ?.delete(callback)
        }
    }

    private notify(
        id: NodeId,
    ) {
        this.subscribers
            .get(id)
            ?.forEach(cb => cb())
    }
}