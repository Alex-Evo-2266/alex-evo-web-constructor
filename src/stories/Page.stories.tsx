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
import { Blocks, DashboardSchema } from "../lib/types/schema";
import { BlockStore } from "../lib/core/renderer/BlockStore";


function createRuntime(blocks: Blocks) {
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
    const blocksStore = new BlockStore(blocks);

    store.set(
        "temperature",
        "24°C",
    );

    store.set(
        "n",
        24,
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
        blocks: blocksStore
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
    schema: DashboardSchema;
}) {
    const runtime = createRuntime(schema.blocks);

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

                blocks: 
                {
                    card: {
                        id: "card",
                        type: "container",

                        children: ["title"],
                    },
                    title: {
                        id: "title",
                        type: "text",

                        props: {
                            text: "Smart Home",
                        },
                    }
                },

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: ["card"],
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

                blocks:{
                    outer: {
                        id: "outer",
                        type: "container",
                        props: {label: "test"},

                        children: ["inner"],
                    },
                    inner: {
                        id: "inner",
                        type: "container",

                        children: ["text"],
                    },
                    text: {
                        id: "text",
                        type: "text",

                        props: {
                            text: "Nested widget",
                        },
                    }
                },

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: ["outer"],
                    },
                ],
            }}
        />
    ),
};

export const EventDemo: Story = {
    args: {
        schema: {
            version:"1.0.0",
            blocks: {
                button: {
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
                }
            },

            layouts: [
                {
                    id: "main",
                    type: "flex",

                    children: ["button"],
                },
            ],
        }
    },
    render: ({schema}) => {
        const runtime =
            createRuntime(schema.blocks);

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
                    schema={schema}
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

                blocks: {
                    button: {
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
                                    "n",

                                value:
                                    "10",
                            },
                            {
                                type:
                                    "set_data",

                                path:
                                    "lamp.state",

                                value:
                                    "ON",
                            }
                        ],
                    },
                    state: {
                        id: "state",
                        type: "text",

                        data:{
                            text: { binding: "lamp.state" },
                        },
                    },
                    test1:  {
                        id: "test1",
                        type: "text",

                        data:{
                            text: { expression: "n * 4" },
                        },
                    }
                },

                layouts: [
                    {
                        id: "main",
                        type: "flex",

                        children: ["button", "state", "test1"],
                    },
                ],
            }}
        />
    ),
};