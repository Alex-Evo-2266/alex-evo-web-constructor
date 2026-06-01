import { ActionSchema } from "./actions";
import { DataNode } from "./dataStore";
import { LayoutSchemaID } from "./layout";
import { OpenModalOptions } from "./modal";

export type NodeId = string

export type Blocks = {[key: NodeId]: WidgetSchema}

export interface DashboardSchema {
    version: string;
    blocks: Blocks;
    rootWidgets: NodeId[]
    layout: LayoutSchemaID;
    modals?: OpenModalOptions[];
}

export interface WidgetSchema<T=Record<string, unknown>> {
    id: string;
    type: string;

    props?: T;

    children?: NodeId[];

    actions?: ActionSchema[];

    data?: Record<string, DataNode>;

    layout?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    };
}

export type WidgetProps<T = any> = { widget: WidgetSchema<T>, children: React.ReactNode}
