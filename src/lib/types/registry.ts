export interface WidgetDefinition {
    type: string

    component: React.ComponentType<any>

    defaultProps?: Record<string, unknown>
}