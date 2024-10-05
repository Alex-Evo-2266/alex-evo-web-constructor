import { BaseAction } from "../pageModels/pageModel"

export interface IMenuSubItem{
    label: string
    icon?: string
    activated?: boolean
    action?: BaseAction
}

export interface IMenuItem{
    label: string
    icon?: string
    activated?: boolean
    action?: BaseAction
    subItems?: IMenuSubItem[]
}

export interface IMenu{
    name: string
    components:IMenuItem[]
}

export interface IMenuProps{
    x: number
    y: number
    components:IMenuItem[]
    visible: boolean
    query?: {[key:string]:string}
}