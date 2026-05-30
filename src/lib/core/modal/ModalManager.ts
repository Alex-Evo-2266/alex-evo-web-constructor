export class ModalManager {
    private modalId?: string

    private context?: unknown

    open(
        modalId: string,
        context?: unknown,
    ) {
        this.modalId = modalId
        this.context = context
    }

    close() {
        this.modalId = undefined
        this.context = undefined
    }

    getCurrentModal() {
        return {
            modalId: this.modalId,
            context: this.context,
        }
    }
}