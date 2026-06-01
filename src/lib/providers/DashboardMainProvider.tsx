import { DataStore } from "../core/data/DataStore"
import { EventBus } from "../core/events/EventBus"
import { ModalManager } from "../core/modal/ModalManager"
import { WidgetRegistry } from "../core/registry/WidgetRegistry"
import { BlockStore } from "../core/renderer/BlockStore"
import { DashboardSchema } from "../types/schema"
import { DashboardProvider, DashboardRuntime } from "./DashboardProvider"

export interface DashboardServices {
    registry: WidgetRegistry
    events?: EventBus
    modals: ModalManager    
    store?: DataStore
}

interface Props {
    runtime: DashboardServices
    schema: DashboardSchema
    children: React.ReactNode;
}

export const DashboardMainProvider = ({children, schema, runtime}:Props) => {

    const baseStore = runtime.store? runtime.store: new DataStore()
    const events = runtime.events? runtime.events: new EventBus()
    if(schema.modals){

        console.log(schema)

        schema.modals.forEach(data=>{
            runtime.modals.addModal(data)
        })
    }

    const runtimeService:DashboardRuntime = {
        blocks: new BlockStore(schema.blocks),
        store: baseStore,
        events,
        registry: runtime.registry,
        modals: runtime.modals,

    }

    return(
        <DashboardProvider runtime={runtimeService}>
            {children}
        </DashboardProvider>
    )
}