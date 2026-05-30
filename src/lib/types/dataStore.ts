

export type DataNode =
    | string
    | number
    | boolean
    | {
          binding: string
      }
    | {
          expression: string
      }

export type Subscriber = (value: unknown) => void
// export interface DataStore {
//     get(path: string): DataValue;

//     set(path: string, value: DataValue): void;

//     subscribe(
//         path: string,
//         callback: (value: DataValue) => void
//     ): () => void;
// }