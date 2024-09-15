import { IOption } from "./optionComponents"
import { TypeComponent } from "../types"

export enum TypeColumn {
	BASE = "",
	ICON = "icon",
	BUTTON = "btn",
	BUTTON_ICON = "btn-icon",
}

export interface IColTable {
	title: string
	name: string
	type?: TypeColumn
	action_url?: string
	out_value?: string
}

export type colTable = string | IColTable

export interface ICelData {
	title?: string
	color?: string
	onClick?: (value:any)=>void
}

export type celData = string | ICelData

export interface IDataItem{
	[index: string]:celData
}

export interface IItemTable {
	data: IDataItem
	onClick?: (row:any)=>void
	action?: boolean
}

export interface ITable{
	type: TypeComponent.TABLE
	src: string
	cols: IColTable[]
	title: string
	items?: IItemTable[]
	option?: IOption
}