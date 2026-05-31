import { NodeId } from "../../types/schema";
import { useRegistry } from "../../providers/DashboardProvider";
import { useBlock } from "../../hooks/useBlock";

interface Props {
    widget: NodeId;
}

export function WidgetRenderer({
    widget,
}: Props) {
    const registry = useRegistry();
    const block = useBlock(widget);

    if (!block) {
        return (
            <div>
                Not found widget: {widget}
            </div>
        );
    }

    const definition = registry.get(block.type);

    if (!definition) {
        return (
            <div>
                Unknown widget: {block.type}
            </div>
        );
    }

    const Component = definition.component;

    return (
        <Component
            widget={block}
        />
    );
}