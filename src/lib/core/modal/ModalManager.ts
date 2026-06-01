import { ModalTemplate, ModalTemplateId, OpenModalOptions } from "../../types/modal"

export class ModalManager {
    private templates = new Map<string, ModalTemplate>()

    private modals: {[key: ModalTemplateId]:OpenModalOptions} = {}
    private modalIdStack: ModalTemplateId[] = []

    private subscribers = new Set<() => void>()
    
    register(modal: ModalTemplate) {
        this.templates.set(modal.type, modal);
    }

    addModal(modal: OpenModalOptions) {
        this.modals[modal.id] = modal
        console.log(modal,  this.modals)

        this.notify()
    }

    get(type: string) {
        return this.templates.get(type);
    }

    open(id: ModalTemplateId) {
        this.modalIdStack.push(id)

        this.notify()
    }

    close() {
        this.modalIdStack.pop()

        this.notify()
    }

    getCurrent() {
        const curIndex = this.modalIdStack.length - 1
        if(curIndex < 0){
            return undefined
        }
        const configId = this.modalIdStack[curIndex]
        return this.modals[configId]
    }

    getTemplate() {
        const curIndex = this.modalIdStack.length - 1
        if(curIndex < 0){
            return undefined
        }
        const configId = this.modalIdStack[curIndex]
        const config = this.modals[configId]
        return this.templates.get(config.schema)
    }

    subscribe(
        callback: () => void,
    ) {
        this.subscribers.add(
            callback,
        )

        return () => {
            this.subscribers.delete(
                callback,
            )
        }
    }

    private notify() {
        this.subscribers.forEach(
            callback => callback(),
        )
    }
}