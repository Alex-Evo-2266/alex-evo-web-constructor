import { ActionSchema } from "./actions";
import { DataNode } from "./dataStore";

export type NodeId = string

export type Blocks = {[key: NodeId]: WidgetSchema}

export interface DashboardSchema {
    version: string;
    blocks: Blocks;
    layouts: LayoutSchema[];
    modals?: ModalSchema[];
}

export interface LayoutSchema {
    id: string;
    type: "grid" | "flex";
    children: NodeId[];
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

export interface ModalSchema {
    id: string;
    title?: string;
    children: NodeId[];
}