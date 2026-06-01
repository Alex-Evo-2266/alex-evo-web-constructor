import { Typography } from "alex-evo-sh-ui-kit"
import { useResolvedData } from "../../lib/hooks/useResolvedData"
import { WidgetProps } from "../../lib/types/schema"


export function TextWidget({
    widget,
}:WidgetProps ) {

    const value = useResolvedData(widget.data?.text)

    return (
        <Typography type="body">
            {value? value.toString(): widget.props?.text}
        </Typography>
    )
}