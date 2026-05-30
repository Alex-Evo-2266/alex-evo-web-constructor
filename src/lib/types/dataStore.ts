export type DataValue =
    | string
    | number
    | boolean
    | object
    | null;

// export interface DataStore {
//     get(path: string): DataValue;

//     set(path: string, value: DataValue): void;

//     subscribe(
//         path: string,
//         callback: (value: DataValue) => void
//     ): () => void;
// }