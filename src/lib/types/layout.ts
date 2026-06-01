import { NodeId } from "./schema";

export type LayoutSchemaID = string

export interface LayoutSchema {
    id: LayoutSchemaID;
    type: "grid" | "flex";
    children: NodeId[];
}