import { useLayout } from "../../providers/DashboardProvider";
import { LayoutSchemaID } from "../../types/layout";
import { NodeId } from "../../types/schema";
import { WidgetRenderer } from "../renderer/WidgetRenderer";

export function Layout({type, rootWigets}:{type:LayoutSchemaID, rootWigets: NodeId[]}) {

    const layouts = useLayout()

    const layout = layouts.get(type)
    const Component = layout?.component
    if(!Component){
        return <div>invalid layout</div>
    }

    return (
        <Component>
            {rootWigets.map(widgetId => (
                <WidgetRenderer
                    key={widgetId}
                    widget={widgetId}
                />
            ))}
        </Component>
    );
}