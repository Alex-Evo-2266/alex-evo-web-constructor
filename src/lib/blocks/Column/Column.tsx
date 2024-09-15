import {ColumnLayout} from 'alex-evo-sh-ui-kit'
import { IColumns } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'


export const Column:React.FC<IColumns> = (data) => {

    return(
        <ColumnLayout 
            items={
                data.value.map((item, index)=>({
                    indexCol: item.indexCol, 
                    node:<Component key={index} data={item.value}/>
                }))
            }
            className={`constructor-component web-constructor-component-column`}
            classNameColumn={`component-container`} 
            countColumn={data.count} 
        />
    )
}