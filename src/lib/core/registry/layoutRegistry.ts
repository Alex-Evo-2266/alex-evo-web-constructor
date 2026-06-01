import React from "react";

export interface LayoutDefinition {
    type: string;
    component: React.ComponentType<any>;
}

export class LayoutRegistry {
    private layouts = new Map<string, LayoutDefinition>();

    register(layout: LayoutDefinition) {
        this.layouts.set(layout.type, layout);
    }

    get(type: string) {
        return this.layouts.get(type);
    }
}