import { TypeComponent } from "../types"
import { ComponentAction } from "./pageModel"

export enum TypeColumn {
	BASE = "BASE",
	JSON = "JSON"
}

export interface IColTable{
	key:string
	label: string
	color?: string
    backgroundColor?: string
	typeCol?: TypeColumn
}

export type IRow = {
	[key:string]:string
}

export interface ITable extends ComponentAction{
	type: TypeComponent.TABLE
	title?: string
	cols: IColTable[]
	row: IRow[]
}