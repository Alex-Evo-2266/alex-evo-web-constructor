import { IFlexContainer } from "../../models/pageModels/pageModel"
import { Component } from "../Component/Component"


export const FlexContainer:React.FC<IFlexContainer> = (data) => {

    return(
        <div style={{
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
        }}>
        {
            data.value.map((item, index)=>(
                <Component data={item} key={index}/>
            ))
        }
        </div>
    )
}