import { Card } from "alex-evo-sh-ui-kit";
import { WidgetProps } from "../../lib/types/schema";
import { useResolvedData } from "../../lib";

export function CardWidget({
    widget,
    children
}: WidgetProps) {

    const label = useResolvedData(widget.data?.label) ?? widget.props?.label
    const text = useResolvedData(widget.data?.text) ?? widget.props?.text

    return (
        <Card header={label} text={text} elevation={10}>
            {children}
        </Card>
    );
}