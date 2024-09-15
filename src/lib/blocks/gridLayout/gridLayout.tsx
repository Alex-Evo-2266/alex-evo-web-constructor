import { GridLayout as GL, GridLayoutItem } from "alex-evo-sh-ui-kit";
import { IGridLayout } from "../../models/pageModels/pageModel";
import { Component } from "../Component/Component";

export const GridLayout:React.FC<IGridLayout> = (data) => {

    return(
        <GL itemWith={(data.option?.width)?`${data.option.width}px`:undefined} minWith="300px">
        {
            data.value.map((item, index)=>(
                <GridLayoutItem key={index}>
                    <Component data={item}/>
                </GridLayoutItem>
            ))
        }
        </GL>
    )
}