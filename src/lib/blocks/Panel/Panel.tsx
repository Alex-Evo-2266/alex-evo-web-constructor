import { IPanel } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import './Panel.scss'

export const Panel:React.FC<IPanel> = (data) => {

    return(
        <div className='alex-evo-web-constructor-panel'>
            <Component data={data.value}/>
        </div>
    )
}