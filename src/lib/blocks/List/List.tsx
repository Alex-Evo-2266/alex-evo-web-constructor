import { IList } from "../../models/pageModels/pageModel";
import { Component } from "../Component/Component";

import './List.scss'

export const ListComponent:React.FC<IList> = (data) => {

    return(
        <div className="alex-evo-web-constructor-list" style={{
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
                <div key={index} className="alex-evo-web-constructor-list-item">
                    <Component data={item}/>
                </div>
            ))
        }
        </div>
    )
}