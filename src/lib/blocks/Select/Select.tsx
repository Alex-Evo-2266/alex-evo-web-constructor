import { IOption, SelectField } from "alex-evo-sh-ui-kit"
import { ISelect } from "../../models/pageModels/pageModel"
import { useContext } from "react"
import { WebConstructorContext } from "../WebConstructor"
import { useAction } from "../../helper/actionHendler"



export const Select:React.FC<ISelect> = (data) => {

    const {containerModal} = useContext(WebConstructorContext)
    const {changeHandler} = useAction()

    const mapOption = (data:(string | {label:string, data: string})[]):(IOption | string)[] => 
        data.map(item=>(typeof(item) === 'string')?item:{title:item.label, value:item.data})

    if (!containerModal)
        return null

    return(
        <SelectField
            style={{
                display: 'block',
                color: data.option?.color, 
                backgroundColor: data.option?.backgroundColor, 
                borderRadius:data.option?.borderRadius && `${data.option?.borderRadius}px`,
                fontSize:data.option?.fontSize && `${data.option?.fontSize}px`,
                width: (data.option?.width) && `${data.option?.width}px`,
                minWidth: (data.option?.width) && `${data.option?.width}px`,
                height: (data.option?.height) && `${data.option?.height}px`,
                lineHeight: data.option?.fontSize && `${data.option?.fontSize + 3}px`,
                textAlign: 
                    (data.option?.pozition == "center")?"center":
                    (data.option?.pozition == "left")?"start":
                    (data.option?.pozition == "right")?"end":
                    undefined,
            }} 
            border onChange={(value)=>changeHandler(data.action, value)} container={containerModal} items={mapOption(data.items)} value={data.value}/>
    )
}