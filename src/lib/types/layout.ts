import { NodeId } from "./schema";


export interface LayoutSchema {
    id: string;
    type: "grid" | "flex";
    children: NodeId[];
}