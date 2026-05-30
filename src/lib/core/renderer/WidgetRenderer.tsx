import { WidgetSchema } from "../../types/schema";
import { useRegistry } from "../../providers/DashboardProvider";

interface Props {
    widget: WidgetSchema;
}

export function WidgetRenderer({
    widget,
}: Props) {
    const registry = useRegistry();

    const definition = registry.get(widget.type);

    if (!definition) {
        return (
            <div>
                Unknown widget: {widget.type}
            </div>
        );
    }

    const Component = definition.component;

    return (
        <Component
            widget={widget}
        />
    );
}