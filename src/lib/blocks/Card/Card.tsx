import {Card as CD} from 'alex-evo-sh-ui-kit'
import { ICard } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import { useAction } from '../../helper/actionHendler'
import { GapComponent } from '../../utilsComponents/gapComponent'

export const Card:React.FC<ICard> = (data) => {

    const {actionHendler} = useAction()

    return(
        <GapComponent>
            <CD 
                style={{
                    width: data.option?.width && `${data.option?.width}px`,
                    height: data.option?.height && `${data.option?.height}px`,
                    backgroundColor: data.option?.backgroundColor,
                    color: data.option?.color,
                    padding: data.option?.padding,
                    margin: data.option?.margin,
                    borderRadius:data.option?.borderRadius && `${data.option?.borderRadius}px`,
                    display: 'flex',
                    justifyContent:
                    (data.option?.pozition == "center")?"center":
                    (data.option?.pozition == "left")?"start":
                    (data.option?.pozition == "right")?"end":
                    undefined
                }}
                header={data.label} 
                imgSrc={data.img} 
                onClick={()=>actionHendler(data.action)}>
                {
                    (data.value)?
                    <Component data={data.value}/>:
                    null
                }
            </CD>
        </GapComponent>
        
    )
}