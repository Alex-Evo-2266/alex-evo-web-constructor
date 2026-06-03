import { Panel } from "alex-evo-sh-ui-kit";
import { WidgetProps } from "../../lib/types/schema";

export function PanelWidget({
    children
}: WidgetProps) {

    return (
        <Panel elevation={10}>
            {children}
        </Panel>
    );
}