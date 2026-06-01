import { Typography } from "alex-evo-sh-ui-kit"
import { useResolvedData } from "../../lib/hooks/useResolvedData"
import { WidgetSchema } from "../../lib/types/schema"


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