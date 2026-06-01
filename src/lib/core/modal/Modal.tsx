import { useModal } from "../../hooks/useModal";
import { useDashboard } from "../../providers/DashboardProvider";

export function Modal() {

    const {modals} = useDashboard()

    const {optional, template} = useModal()

    if(!optional || !template){
        return(
            null
        )
    }

    const Component = template.component

    return (
        <Component close={modals.close.bind(modals)} optional={optional}/>
    );
}