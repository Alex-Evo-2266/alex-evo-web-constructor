import { useModal } from "../../hooks/useModal";
import { useDashboard } from "../../providers/DashboardProvider";
import { Layout } from "../layout/Layout";

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
        <Component close={modals.close.bind(modals)} optional={optional}>
            <Layout rootWigets={optional.rootWidgets} type={optional.layout}/>
        </Component>
    );
}