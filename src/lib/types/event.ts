export interface DashboardEvent<T = unknown> {
    type: string
    payload?: T
}
