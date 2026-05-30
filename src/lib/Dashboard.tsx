import { DashboardSchema } from "./types/schema";
import { WidgetRenderer } from "./core/renderer/WidgetRenderer";

interface Props {
    schema: DashboardSchema;
}

export function Dashboard({
    schema,
}: Props) {
    return (
        <>
            {schema.layouts.map(layout => (
                <div key={layout.id}>
                    {layout.children.map(widget => (
                        <WidgetRenderer
                            key={widget.id}
                            widget={widget}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}