import { Typography } from 'alex-evo-sh-ui-kit'
import { IKeyValue } from '../../models/pageModels/pageModel'
import { Component } from '../Component/Component'
import './KeyValue.scss'

export const KeyValue:React.FC<IKeyValue> = (data) => {
    return(
        <div className='alex-evo-web-constructor-key-value'>
            <div className='alex-evo-web-constructor-key-value-key'>
                <div className='alex-evo-web-constructor-key-value-key-contant'>
                    <Typography
                    type='body'
                    style={{
                        color: data.option?.color, 
                        backgroundColor: data.option?.backgroundColor, 
                        borderRadius:`${data.option?.borderRadius ?? 0}px`,
                        fontSize:`${data.option?.fontSize ?? 18}px`,
                        width: (data.option?.width)?`${data.option?.width}px`:"100%",
                        minWidth: (data.option?.width)?`${data.option?.width}px`:"100%",
                        height: (data.option?.height)?`${data.option?.height}px`:"100%",
                        textAlign: 
                            (data.option?.pozition == "center")?"center":
                            (data.option?.pozition == "left")?"start":
                            (data.option?.pozition == "right")?"end":
                            undefined,
                    }} 
                    >
                        {data.label}
                    </Typography>
                </div>
                
            </div>
            <div className='alex-evo-web-constructor-key-value-value'>
                <div className='alex-evo-web-constructor-key-value-value-contant'>
                    <Component data={data.value}/>
                </div>
            </div>
        </div>
    )
}