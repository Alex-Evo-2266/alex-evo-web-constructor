import { LayoutSchemaID } from "./layout"
import { NodeId } from "./schema"

export type ModalTemplateId = string

export type ModalTemplate = {
    type: ModalTemplateId

    component: React.ComponentType<any>
}

export type ModalProps = { optional: OpenModalOptions, close: ()=>void, children: React.ReactNode }

export interface OpenModalOptions {
    id: string
    schema: ModalTemplateId

    header?: string

    width?: number

    height?: number

    x?: number
    y?: number

    layout: LayoutSchemaID
    rootWidgets: NodeId[]

    // widgets: Blocks
}