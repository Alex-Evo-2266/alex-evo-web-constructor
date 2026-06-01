import { DataStore }
    from "../data/DataStore"

import { EventBus }
    from "../events/EventBus"

import { ModalManager }
    from "../modal/ModalManager"

import {
    ActionSchema,
} from "../../types/actions"

export class ActionExecutor {
    constructor(
        private store: DataStore,
        private events: EventBus,
        private modals: ModalManager,
    ) {}

    execute(
        action: ActionSchema,
    ) {
        switch (action.type) {
            case "emit":
                this.events.emit({
                    type: action.event,
                    payload:
                        action.payload,
                })
                break

            case "set_data":
                this.store.set(
                    action.path,
                    action.value,
                )
                break

            case "open_modal":
                this.modals.getCurrent
                this.modals.open(action.modalId)
                break

            case "close_modal":
                this.modals.close()
                break
        }
    }

    executeMany(
        actions:
            | ActionSchema[]
            | undefined,
    ) {
        actions?.forEach(action =>
            this.execute(action),
        )
    }
}