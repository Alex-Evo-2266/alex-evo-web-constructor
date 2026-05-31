import React, { createContext, useContext } from "react";
import { WidgetRegistry } from "../core/registry/WidgetRegistry";
import { EventBus } from "../core/events/EventBus";
import { DataStore } from "../core/data/DataStore";
import { ModalManager } from "../core/modal/ModalManager";
import { BlockStore } from "../core/renderer/BlockStore";

export interface DashboardRuntime {
    registry: WidgetRegistry
    store: DataStore
    events: EventBus
    modals: ModalManager
    blocks: BlockStore
}

interface Props {
    runtime: DashboardRuntime
    children: React.ReactNode;
}

export const DashboardContext = createContext<DashboardRuntime | null>(null);

export function DashboardProvider({
    runtime,
    children,
}: Props) {

    return (
        <DashboardContext.Provider value={runtime}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const ctx =
        useContext(DashboardContext)

    if (!ctx) {
        throw new Error(
            "DashboardProvider missing",
        )
    }

    return ctx
}

export function useRegistry() {
    const ctx = useDashboard();

    if (!ctx || !ctx.registry) {
        throw new Error("DashboardProvider missing");
    }

    return ctx.registry;
}
