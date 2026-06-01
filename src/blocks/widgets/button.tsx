import { Button } from "alex-evo-sh-ui-kit"
import { ActionExecutor } from "../../lib/core/actions/ActionExecutor"
import { useResolvedData } from "../../lib/hooks/useResolvedData"
import { useDashboard } from "../../lib/providers/DashboardProvider"
import { WidgetSchema } from "../../lib/types/schema"


export function ButtonWidget({
    widget,
}:{ widget: WidgetSchema<{label: string}>} ) {
    const {
        store,
        events,
        modals,

    } = useDashboard()

    const label = useResolvedData(widget.data?.label) ?? widget.props?.label

    const executor =
        new ActionExecutor(
            store,
            events,
            modals,
        )

    return (
        <Button
            onClick={() =>
                executor.executeMany(
                    widget.actions,
                )
            }
        >
            {label}
        </Button>
    )
}