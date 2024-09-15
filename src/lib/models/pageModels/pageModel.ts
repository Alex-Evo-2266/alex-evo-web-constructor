import {TypeComponent} from '../types'
import {IOption} from './optionComponents'
import { ITable } from './table'

export enum ActionType {
	GET_REQUEST = "GET_REQUEST",
	LINK = "LINK",
	DIALOG = "DIALOG",
	NONE = "NONE",
	MENU = "MENU",
}

export enum ControlItemType {
	ENUM = "ENUM",
	SWITCH = "SWITCH",
	SEND_TEXT = "SEND_TEXT",
	TEXT = "TEXT",
	RANGE = "RANGE"
}

//----------------base interface----------------

interface BaseComponent
{
	type: TypeComponent
	name?: string
	option?: IOption
}

export interface ActionTemplate{
	action_type: ActionType
	action_target?: string
}

export interface ActionTtarget extends ActionTemplate{
	action_type: ActionType.DIALOG | ActionType.GET_REQUEST | ActionType.LINK | ActionType.MENU
	action_target: string
}

export interface ActionNoTarget extends ActionTemplate{
	action_type: ActionType.NONE
}

export type BaseAction = ActionTtarget | ActionNoTarget

//----------------content----------------

//----------------content----------------

export interface ComponentAction extends BaseComponent {
	action: BaseAction
}

export interface ComponentContent extends BaseComponent {}

//----------------base interface----------------

//----------------card interface----------------

interface ICardTemplate extends ComponentContent
{
	type: TypeComponent.CARD
	action: BaseAction
	img?: string
	label: string
	value?: IComponents
}

export interface ICard extends ICardTemplate{
	type: TypeComponent.CARD
}

//----------------card interface----------------

//----------------card control interface----------------

export interface ControlItem 
{
	control_item_type: ControlItemType
	name: string
}

//----------------card control interface----------------

//----------------text interface----------------

export interface ITextField extends ComponentContent
{
	type: TypeComponent.TEXT
	value: string
}

//----------------text interface----------------

//----------------button interface----------------

export interface IButton extends ComponentAction{
	type: TypeComponent.BUTTON
	label: string
}

//----------------button interface----------------

//----------------columns interface----------------

export interface IColumnElement{
	indexCol: number
	value: IComponents
}

export interface IColumns extends BaseComponent{
	type: TypeComponent.COLUMNS
	value: IColumnElement[]
	count: number
}

//----------------columns interface----------------

export interface IList extends BaseComponent {
	type: TypeComponent.LIST,
	value: IComponents[]
}

export interface IKeyValue extends BaseComponent {
	type: TypeComponent.KEY_VALUE,
	label: string
	value: IComponents
}

export interface IDivider extends BaseComponent {
	type: TypeComponent.DIVIDER,
	label?: string
}

export interface IFlexContainer extends BaseComponent {
	type: TypeComponent.FLEX_CONTAINER,
	value: IComponents[]
}

export interface IGridLayout extends BaseComponent{
	type: TypeComponent.GRID_LAYOUT,
	value: IComponents[]
}

export interface IPanel extends BaseComponent{
	type: TypeComponent.PANEL,
	value: IComponents
}

export type IComponents = ITextField | ITable | ICard | IButton | IColumns | IList | IKeyValue | IDivider | IFlexContainer | IGridLayout | IPanel

export interface IPage{
	page: IComponents[]
	url: string
	name: string
} 