import { IList } from "../../models/pageModels/pageModel";
import { Component } from "../Component/Component";

import './List.scss'

export const ListComponent:React.FC<IList> = (data) => {

    return(
        <div className="alex-evo-web-constructor-list">
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