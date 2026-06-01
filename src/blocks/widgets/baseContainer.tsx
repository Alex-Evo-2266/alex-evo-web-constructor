import { ContentBox } from "alex-evo-sh-ui-kit";
import { WidgetSchema } from "../../lib/types/schema";
import { WidgetRenderer } from "../../lib/core/renderer/WidgetRenderer";

export function ContainerWidget({
    widget,
}: { widget: WidgetSchema<{label: string}>}) {
    return (
        <ContentBox border label={widget.props?.label ?? ""} collapsible>
            {widget.children?.map((child: any) => (
                <WidgetRenderer
                    key={child}
                    widget={child}
                />
            ))}
        </ContentBox>
    );
}