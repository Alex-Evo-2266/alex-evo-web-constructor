import { ActionSchema } from "./actions";

export interface DashboardSchema {
    version: string;
    layouts: LayoutSchema[];
    modals?: ModalSchema[];
}

export interface LayoutSchema {
    id: string;
    type: "grid" | "flex";
    children: WidgetSchema[];
}

export interface WidgetSchema<T=Record<string, unknown>> {
    id: string;
    type: string;

    props?: T;

    children?: WidgetSchema[];

    actions?: ActionSchema[];

    data?: Record<string, string>;

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
    children: WidgetSchema[];
}