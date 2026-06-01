import React from "react";

export interface WidgetDefinition {
    type: string;
    component: React.ComponentType<any>;
}

export class WidgetRegistry {
    private widgets = new Map<string, WidgetDefinition>();

    register(widget: WidgetDefinition) {
        this.widgets.set(widget.type, widget);
    }

    get(type: string) {
        return this.widgets.get(type);
    }
}