import { ContentBox } from "alex-evo-sh-ui-kit";
import { WidgetRenderer } from "../core/renderer/WidgetRenderer";
import { WidgetSchema } from "../types/schema";

export function ContainerWidget({
    widget,
}: { widget: WidgetSchema<{label: string}>}) {
    return (
        <ContentBox border label={widget.props?.label ?? ""} collapsible>
            {widget.children?.map((child: any) => (
                <WidgetRenderer
                    key={child.id}
                    widget={child}
                />
            ))}
        </ContentBox>
    );
}