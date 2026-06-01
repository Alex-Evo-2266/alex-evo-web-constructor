Web constructor

Инструкция по использованию.

Для начала создать стор виджетов и layout и заполнить из.

```tsx
		import { LayoutRegistry, WidgetRegistry } from "../lib";

		...

		const registry = new WidgetRegistry();
		const layouts = new LayoutRegistry()

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

		layouts.register({
			type: "flex",
			component: FlexLayout
		})
```

Далее сторы для event, data и models и заполнить их при необходимости.

```tsx
	import { DataStore, EventBus, ModalManager } from "../lib";

	const store = new DataStore();
	const events = new EventBus();
	const modals = new ModalManager();

	store.set(
		"temperature",
		"24°C",
	);

	events.on(
		"lamp.toggle",
		event => {
			console.log(
				"EVENT:",
				event,
			);
		},
	);

	modals.register({
		type: "alex-modal",
		component: Modal
	})

```

И передать их в Provider также передать schema о ней далее

```tsx
	...

	const runtime = {
		registry,
		store,
		events,
		modals,
		layouts
	};

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
```


пример schema

``` js
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
					type:"open_modal",
					modalId: "modaltest"
				},
			],
		},
		button2: {
			id: "button2",
			type: "button",

			props: {
				label:"Turn ON",
			},
			actions: [
				{
					type:"set_data",
					path:"n",
					value:"10",
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
```