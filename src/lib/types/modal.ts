import { LayoutSchema } from "./layout"

export type ModalTemplateId = string

export type ModalTemplate = {
    type: ModalTemplateId

    component: React.ComponentType<any>
}

export type ModalProps = { optional: OpenModalOptions, close: ()=>void }

export interface OpenModalOptions {
    id: string
    schema: ModalTemplateId

    header?: string

    width?: number

    height?: number

    x?: number
    y?: number

    layout: LayoutSchema

    // widgets: Blocks
}