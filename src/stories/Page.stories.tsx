import type { Meta, StoryObj } from "@storybook/react";
import { WidgetRegistry } from "../lib/core/registry/WidgetRegistry";
import { TextWidget } from "../lib/widgets/text";
import { ButtonWidget } from "../lib/widgets/button";
import { DataStore } from "../lib/core/data/DataStore";
import { EventBus } from "../lib/core/events/EventBus";
import { ModalManager } from "../lib/core/modal/ModalManager";
import { Dashboard } from "../lib/Dashboard";
import { DashboardProvider } from "../lib/providers/DashboardProvider";
import { ContainerWidget } from "../lib/widgets/baseContainer";


function createRuntime() {
    const registry = new WidgetRegistry();

    registry.register({
        type: "text",
        component: TextWidget,
    });

    registry.register({
        type: "button",
        component: ButtonWidget,
    });

    registry.register({
        type: "container",
        component: ContainerWidget,
    });

    const store = new DataStore();
    const events = new EventBus();
    const modals = new ModalManager();

    store.set(
        "temperature",
        "24°C",
    );

    store.set(
        "lamp.state",
        "OFF",
    );

    return {
        registry,
        store,
        events,
        modals,
    };
}

const meta: Meta<typeof Dashboard> = {
    title: "Dashboard/Core",
    component: Dashboard,
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

function DashboardWrapper({
    schema,
}: {
    schema: any;
}) {
    const runtime = createRuntime();

    return (
        <DashboardProvider
            runtime={runtime}
        >
            <Dashboard
                schema={schema}
            />
        </DashboardProvider>
    );
}


export const SimpleCard: Story = {
    render: () => (
        <DashboardWrapper
            schema={{
                version: "1.0.0",

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: [
                            {
                                id: "card",
                                type: "container",

                                children: [
                                    {
                                        id: "title",
                                        type: "text",

                                        props: {
                                            text: "Smart Home",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }}
        />
    ),
};


export const NestedContainers: Story = {
    render: () => (
        <DashboardWrapper
            schema={{
                version: "1.0.0",

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: [
                            {
                                id: "outer",
                                type: "container",

                                children: [
                                    {
                                        id: "inner",
                                        type: "container",

                                        children: [
                                            {
                                                id: "text",
                                                type: "text",

                                                props: {
                                                    text: "Nested widget",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }}
        />
    ),
};

export const EventDemo: Story = {
    render: () => {
        const runtime =
            createRuntime();

        runtime.events.on(
            "lamp.toggle",
            event => {
                console.log(
                    "EVENT:",
                    event,
                );
            },
        );

        return (
            <DashboardProvider
                runtime={runtime}
            >
                <Dashboard
                    schema={{
                        version:
                            "1.0.0",

                        layouts: [
                            {
                                id: "main",
                                type: "flex",

                                children: [
                                    {
                                        id: "button",
                                        type: "button",

                                        props: {
                                            label:
                                                "Toggle Lamp",
                                        },

                                        actions: [
                                            {
                                                type:
                                                    "emit",

                                                event:
                                                    "lamp.toggle",

                                                payload:
                                                    {
                                                        id:
                                                            "lamp1",
                                                    },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    }}
                />
            </DashboardProvider>
        );
    },
};


export const SetDataAction: Story = {
    render: () => (
        <DashboardWrapper
            schema={{
                version: "1.0.0",

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: [
                            {
                                id: "button",
                                type: "button",

                                props: {
                                    label:
                                        "Turn ON",
                                },

                                actions: [
                                    {
                                        type:
                                            "set_data",

                                        path:
                                            "lamp.state",

                                        value:
                                            "ON",
                                    },
                                ],
                            },
                            {
                                id: "state",
                                type: "text",

                                data:{
                                    text:"lamp.state",
                                },
                            },
                        ],
                    },
                ],
            }}
        />
    ),
};