import { IFlexContainer } from "../../models/pageModels/pageModel"
import { Component } from "../Component/Component"


export const FlexContainer:React.FC<IFlexContainer> = (data) => {

    return(
        <div style={{
            display: 'flex',
            justifyContent:
            (data.option?.pozition == "center")?"center":
            (data.option?.pozition == "left")?"start":
            (data.option?.pozition == "right")?"end":
            undefined
        }}>
        {
            data.value.map((item, index)=>(
                <Component data={item} key={index}/>
            ))
        }
        </div>
    )
}