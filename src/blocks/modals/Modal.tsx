import { FullScreenTemplateDialog } from "alex-evo-sh-ui-kit";
import { ModalProps } from "../../lib/types/modal";

export function Modal({ optional, close, children }: ModalProps) {
    return (
        <FullScreenTemplateDialog header={optional.header ?? ""} onHide={close}>
            {children}
        </FullScreenTemplateDialog>
    );
}