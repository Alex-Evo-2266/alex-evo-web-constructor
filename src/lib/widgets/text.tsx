
import { Typography } from "alex-evo-sh-ui-kit"
import { WidgetSchema } from "../types/schema"
import { useData } from "../hooks/useData"

export function TextWidget({
    widget,
}:{ widget: WidgetSchema<{text: string}>} ) {

    const value = useData(widget.data?.text)

    return (
        <Typography type="body">
            {value? value.toString(): widget.props?.text}
        </Typography>
    )
}