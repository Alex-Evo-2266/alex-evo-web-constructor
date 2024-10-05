import './Component.scss'

import { IComponents } from "../../models/pageModels/pageModel"
import { TypeComponent } from "../../models/types"
import { Column } from "../Column/Column"
import { Text } from "../Text/Text"
import { ListComponent } from "../List/List"
import { ButtonComponent } from "../Button/Button"
import { KeyValue } from "../KeyValue/KeyValue"
import { Divider } from "../Divider/Divider"
import { Card } from "../Card/Card"
import { FlexContainer } from "../FlexContainer/FlexContainer"
import { GridLayout } from "../gridLayout/gridLayout"
import { Panel } from '../Panel/Panel'
import { Slider } from '../Slider/Slider'
import { Select } from '../Select/Select'
import { Switch } from '../Switch/Switch'
import { SendText } from '../SendText/SendText'
import { Table } from '../Table/Table'

export interface ComponentProp{
    data: IComponents
}

export const Component: React.FC<ComponentProp> = ({data}) => {


    const Components:{[key in TypeComponent]:React.FC<any>} = {
        [TypeComponent.COLUMNS]: Column,
        [TypeComponent.TEXT]: Text,
        [TypeComponent.LIST]: ListComponent,
        [TypeComponent.BUTTON]: ButtonComponent,
        [TypeComponent.KEY_VALUE]: KeyValue,
        [TypeComponent.DIVIDER]: Divider,
        [TypeComponent.CARD]: Card,
        [TypeComponent.FLEX_CONTAINER]: FlexContainer,
        [TypeComponent.GRID_LAYOUT]: GridLayout,
        [TypeComponent.PANEL]: Panel,
        [TypeComponent.SLIDER]: Slider,
        [TypeComponent.SELECT]: Select,
        [TypeComponent.SWITCH]: Switch,
        [TypeComponent.SEND_TEXT]: SendText,
        [TypeComponent.TABLE]: Table,
    }

    const Component = Components[data.type]

    return(
        <div className="component-container">
        {
            <Component {...{...data}}/>
        }
        </div>
    )
}