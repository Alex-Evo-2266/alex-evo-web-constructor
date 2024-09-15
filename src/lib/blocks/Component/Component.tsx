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

export interface ComponentProp{
    data: IComponents
}

export const Component: React.FC<ComponentProp> = ({data}) => {

    return(
        <div className="component-container">
        {
            (data.type === TypeComponent.COLUMNS)?
            <Column {...{...data}}/>:
            (data.type === TypeComponent.TEXT)?
            <Text {...{...data}}/>:
            (data.type === TypeComponent.LIST)?
            <ListComponent {...{...data}}/>:
            (data.type === TypeComponent.BUTTON)?
            <ButtonComponent {...{...data}}/>:
            (data.type === TypeComponent.KEY_VALUE)?
            <KeyValue {...{...data}}/>:
            (data.type === TypeComponent.DIVIDER)?
            <Divider {...{...data}}/>:
            (data.type === TypeComponent.CARD)?
            <Card {...{...data}}/>:
            (data.type === TypeComponent.FLEX_CONTAINER)?
            <FlexContainer {...{...data}}/>:
            (data.type === TypeComponent.GRID_LAYOUT)?
            <GridLayout {...{...data}}/>:
            (data.type === TypeComponent.PANEL)?
            <Panel {...{...data}}/>:
            JSON.stringify(data)
        }
        </div>
    )
}