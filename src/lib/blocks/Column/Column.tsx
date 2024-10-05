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
            style={{
                width: data.option?.width && `${data.option?.width}px`,
                height: data.option?.height && `${data.option?.height}px`,
                backgroundColor: data.option?.backgroundColor,
                color: data.option?.color,
                padding: data.option?.padding,
                margin: data.option?.margin,
                borderRadius:data.option?.borderRadius && `${data.option?.borderRadius}px`
            }}
            className={`constructor-component web-constructor-component-column`}
            classNameColumn={`component-container`} 
            countColumn={data.count} 
        />
    )
}