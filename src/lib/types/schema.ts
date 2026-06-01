import { ActionSchema } from "./actions";
import { DataNode } from "./dataStore";
import { LayoutSchema } from "./layout";
import { OpenModalOptions } from "./modal";

export type NodeId = string

export type Blocks = {[key: NodeId]: WidgetSchema}

export interface DashboardSchema {
    version: string;
    blocks: Blocks;
    layouts: LayoutSchema[];
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
