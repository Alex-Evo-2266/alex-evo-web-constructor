import { IPanel } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import './Panel.scss'

export const Panel:React.FC<IPanel> = (data) => {

    return(
        <div 
            className='alex-evo-web-constructor-panel'
            style={{
                color: data.option?.color, 
                padding: data.option?.padding,
                margin: data.option?.margin,
                backgroundColor: data.option?.backgroundColor, 
                borderRadius:data.option?.borderRadius?`${data.option?.borderRadius}px`:undefined,
                width: (data.option?.width) && `${data.option?.width}px`,
                minWidth: (data.option?.width) && `${data.option?.width}px`,
                height: (data.option?.height) && `${data.option?.height}px`,
                display: data.option?.pozition && data.option?.pozition !== 'center'? 'flex':undefined,
                justifyContent:
                (data.option?.pozition == "left")?"start":
                (data.option?.pozition == "right")?"end":
                undefined
            }}
        >
            {
                data.value && <Component data={data.value}/>
            }
        </div>
    )
}