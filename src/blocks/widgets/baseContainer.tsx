import { ContentBox } from "alex-evo-sh-ui-kit";
import { WidgetProps } from "../../lib/types/schema";

export function ContainerWidget({
    widget,
    children
}: WidgetProps) {
    return (
        <ContentBox border label={widget.props?.label ?? ""} collapsible>
            {children}
        </ContentBox>
    );
}