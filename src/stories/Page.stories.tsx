import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "../lib/Dashboard";
import { DashboardSchema } from "../lib/types/schema";
import { DashboardMainProvider } from "../lib/providers/DashboardMainProvider";
import { TextWidget } from "../blocks/widgets/text";
import { ButtonWidget } from "../blocks/widgets/button";
import { ContainerWidget } from "../blocks/widgets/baseContainer";
import { FlexLayout } from "../blocks/layouts/Flex";
import { Modal } from "../blocks/modals/Modal";
import { DataStore, EventBus, LayoutRegistry, ModalManager, WidgetRegistry } from "../lib";
import { CardWidget } from "../blocks/widgets/Card";
import { PanelWidget } from "../blocks/widgets/Panel";
import { SmartDeviceWidget } from "../blocks/widgets/SmartDeviceWidget";


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

    registry.register({
        type: "card",
        component: CardWidget,
    });

    registry.register({
        type: "panel",
        component: PanelWidget,
    });

    registry.register({
        type: "SmartDeviceWidget",
        component: SmartDeviceWidget,
    });

    const layouts = new LayoutRegistry()

    layouts.register({
        type: "flex",
        component: FlexLayout
    })

    const store = new DataStore();
    const events = new EventBus();
    const modals = new ModalManager();

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
        layouts
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
    const runtime = createRuntime();

    return (
        <DashboardMainProvider
            runtime={runtime}
            schema={schema}
        >
            <Dashboard
                schema={schema}
            />
        </DashboardMainProvider>
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
                layout: "flex",
                rootWidgets: ["card"]
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
                layout: "flex",
                rootWidgets: ["outer"]
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
            layout: "flex",
            rootWidgets: ["button"]
        }
    },
    render: ({schema}) => {
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
            <DashboardMainProvider
                runtime={runtime}
                schema={schema}
            >
                <Dashboard
                    schema={schema}
                />
            </DashboardMainProvider>
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
                layout: "flex",
                rootWidgets: ["button", "state", "test1"]
            }}
        />
    ),
};

export const ModalDemo: Story = {
    args: {
        schema: {
            version:"1.0.0",
            blocks: {
                button: {
                    id: "button",
                    type: "button",

                    data: {
                        label: "Toggle Lamp"
                    },

                    actions: [
                        {
                            type:
                                "open_modal",

                            modalId: "modaltest"

                        },
                    ],
                },
                button2: {
                    id: "button2",
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
                        }
                    ],
                },
                test1:  {
                    id: "test1",
                    type: "text",

                    data:{
                        text: { expression: "n * 4" },
                    },
                },
                test2:  {
                    id: "test2",
                    type: "text",

                    data:{
                        text: "test text",
                    },
                }
            },

            layout: "flex",
            rootWidgets: ["button", "test2"],

            modals: [
                {
                    id: "modaltest",
                    rootWidgets:["test1", "button2"],
                    layout: "flex",
                    schema: "alex-modal"
                }
            ]
        }
    },
    render: ({schema}) => {
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

        runtime.modals.register({
            type: "alex-modal",
            component: Modal
        })


        return (
            <DashboardMainProvider
                runtime={runtime}
                schema={schema}
            >
                <Dashboard
                    schema={schema}
                />
            </DashboardMainProvider>
        );
    },
};

export const Demo: Story = {
    args: {
        schema: {
            version:"1.0.0",
            blocks: {
                button: {
                    id: "button",
                    type: "button",

                    data: {
                        label: "Toggle Lamp"
                    },

                    actions: [
                        {
                            type:
                                "open_modal",

                            modalId: "modaltest"

                        },
                    ],
                },
                button2: {
                    id: "button2",
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
                        }
                    ],
                },
                test1:  {
                    id: "test1",
                    type: "text",

                    data:{
                        text: { expression: "n * 4" },
                    },
                },
                test2:  {
                    id: "test2",
                    type: "text",

                    data:{
                        text: "test text",
                    },
                },
                test3: {
                    id: "test3",
                    type: "SmartDeviceWidget",
                    data: {
                        state: { binding: "lamp.state" },
                        value: { binding: "temperature" }
                    },
                    actions:[
                        { type: "emit", event: "lamp.toggle" }
                    ]
                }
            },

            layout: "flex",
            rootWidgets: ["button", "test2", "test3"],

            modals: [
                {
                    id: "modaltest",
                    rootWidgets:["test1", "button2"],
                    layout: "flex",
                    schema: "alex-modal"
                }
            ]
        }
    },
    render: ({schema}) => {
        const runtime =
            createRuntime();

        runtime.events.on(
            "lamp.toggle",
            event => {
                console.log(
                    "EVENT:",
                    event,
                );
                const prev = runtime.store.get("lamp.state")
                if(prev ===  "ON")
                    runtime.store.set("lamp.state", "OFF")
                else
                    runtime.store.set("lamp.state", "ON")
            },
        );

        runtime.modals.register({
            type: "alex-modal",
            component: Modal
        })


        return (
            <DashboardMainProvider
                runtime={runtime}
                schema={schema}
            >
                <Dashboard
                    schema={schema}
                />
            </DashboardMainProvider>
        );
    },
};

export const DemoHTML: Story = {
    args: {
        schema: {
            version:"1.0.0",
            blocks: {
                button: {
                    id: "button",
                    type: "button",

                    data: {
                        label: "Toggle Lamp"
                    },

                    actions: [
                        {
                            type:
                                "open_modal",

                            modalId: "modaltest"

                        },
                    ],
                },
                button2: {
                    id: "button2",
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
                        }
                    ],
                },
                test1:  {
                    id: "test1",
                    type: "text",

                    data:{
                        text: { expression: "n * 4" },
                    },
                },
                test2:  {
                    id: "test2",
                    type: "text",

                    data:{
                        text: "test text",
                    },
                },
                test3: {
                    id: "test3",
                    type: "SmartDeviceWidget",
                    data: {
                        state: { binding: "lamp.state" },
                        value: { binding: "temperature" }
                    },
                    actions:[
                        { type: "emit", event: "lamp.toggle" }
                    ]
                },
                testhtml1:{
                    id: "testhtml1",
                    type: "castom",
                    html: `<div class="testclass" action-data="test-event"></div>`,
                    css:`.testclass{
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 10px;
}`
                }
            },

            layout: "flex",
            rootWidgets: ["button", "test2", "test3", "testhtml1"],

            modals: [
                {
                    id: "modaltest",
                    rootWidgets:["test1", "button2"],
                    layout: "flex",
                    schema: "alex-modal"
                }
            ]
        }
    },
    render: ({schema}) => {
        const runtime =
            createRuntime();

        runtime.events.on(
            "lamp.toggle",
            event => {
                console.log(
                    "EVENT:",
                    event,
                );
                const prev = runtime.store.get("lamp.state")
                if(prev ===  "ON")
                    runtime.store.set("lamp.state", "OFF")
                else
                    runtime.store.set("lamp.state", "ON")
            },
        );

        runtime.events.on(
            "test-event",
            event => {
                console.log("testevent", event)
            }
        )

        runtime.modals.register({
            type: "alex-modal",
            component: Modal
        })


        return (
            <DashboardMainProvider
                runtime={runtime}
                schema={schema}
            >
                <Dashboard
                    schema={schema}
                />
            </DashboardMainProvider>
        );
    },
};