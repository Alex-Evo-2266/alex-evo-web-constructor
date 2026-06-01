import { FullScreenTemplateDialog } from "alex-evo-sh-ui-kit";
import { WidgetRenderer } from "../core/renderer/WidgetRenderer";
import { ModalProps } from "../types/modal";

export function Modal({ optional, close }: ModalProps) {
    return (
        <FullScreenTemplateDialog header={optional.header ?? ""} onHide={close}>
            {
                optional.layout.type === "flex"?
                <div key={optional.layout.id}>
                    {optional.layout.children.map(widgetId => (
                        <WidgetRenderer
                            key={widgetId}
                            widget={widgetId}
                        />
                    ))}
                </div>:
                optional.layout.type === "grid"?
                <div key={optional.layout.id}>
                    {optional.layout.children.map(widgetId => (
                        <WidgetRenderer
                            key={widgetId}
                            widget={widgetId}
                        />
                    ))}
                </div>:
                <div>invalid layout</div>
            }
        </FullScreenTemplateDialog>
    );
}