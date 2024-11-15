import { IPanel } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import {Panel as PanelComponent} from 'alex-evo-sh-ui-kit'
import { GapComponent } from '../../utilsComponents/gapComponent'
import './Panel.scss'

export const Panel:React.FC<IPanel> = (data) => {

    return(
        <GapComponent>
            <PanelComponent
                className='alex-evo-web-constructor-panel'
                style={{
                    color: data.option?.color, 
                    padding: data.option?.padding ?? '10px',
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
            </PanelComponent>
        </GapComponent>
        
    )
}