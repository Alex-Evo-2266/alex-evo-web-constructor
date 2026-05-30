export type ActionSchema =
    | EmitAction
    | SetDataAction
    | OpenModalAction
    | CloseModalAction

export interface EmitAction {
    type: "emit"

    event: string

    payload?: unknown
}

export interface SetDataAction {
    type: "set_data"

    path: string

    value: unknown
}

export interface OpenModalAction {
    type: "open_modal"

    modalId: string

    context?: Record<
        string,
        unknown
    >
}

export interface CloseModalAction {
    type: "close_modal"
}