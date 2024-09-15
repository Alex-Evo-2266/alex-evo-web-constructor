import {Card as CD} from 'alex-evo-sh-ui-kit'
import { ICard } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import { useAction } from '../../helper/actionHendler'

export const Card:React.FC<ICard> = (data) => {

    const {actionHendler} = useAction()

    return(
        <CD header={data.label} imgSrc={data.img} onClick={()=>actionHendler(data.action)}>
            {
                (data.value)?
                <Component data={data.value}/>:
                null
            }
        </CD>
    )
}