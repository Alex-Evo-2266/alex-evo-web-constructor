
import { useDashboard }
    from "../providers/DashboardProvider"

import { ActionExecutor }
    from "../core/actions/ActionExecutor"
import { Button } from "alex-evo-sh-ui-kit"
import { WidgetSchema } from "../types/schema"

export function ButtonWidget({
    widget,
}:{ widget: WidgetSchema<{label: string}>} ) {
    const {
        store,
        events,
        modals,
    } = useDashboard()

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
            {widget.props?.label}
        </Button>
    )
}