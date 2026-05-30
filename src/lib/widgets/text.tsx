
import { Typography } from "alex-evo-sh-ui-kit"
import { WidgetSchema } from "../types/schema"
import { useResolvedData } from "../hooks/useResolvedData"

export function TextWidget({
    widget,
}:{ widget: WidgetSchema<{text: string}>} ) {

    const value = useResolvedData(widget.data?.text)

    return (
        <Typography type="body">
            {value? value.toString(): widget.props?.text}
        </Typography>
    )
}