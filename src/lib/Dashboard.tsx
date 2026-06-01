import { DashboardSchema } from "./types/schema";
import { Layout } from "./core/layout/Layout";

interface Props {
    schema: DashboardSchema;
}

export function Dashboard({
    schema,
}: Props) {
    return (
        <Layout rootWigets={schema.rootWidgets} type={schema.layout}/>
    );
}