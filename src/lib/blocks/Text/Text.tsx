import { Typography } from "alex-evo-sh-ui-kit"
import { ITextField } from "../../models/pageModels/pageModel"

export const Text:React.FC<ITextField> = (data) => {

    return(
    <Typography
        type='body'
        style={{
            display: 'block',
            color: data.option?.color, 
            backgroundColor: data.option?.backgroundColor, 
            borderRadius:`${data.option?.borderRadius ?? 0}px`,
            fontSize:`${data.option?.fontSize ?? 18}px`,
            width: (data.option?.width)?`${data.option?.width}px`:"100%",
            minWidth: (data.option?.width)?`${data.option?.width}px`:"100%",
            height: (data.option?.height)?`${data.option?.height}px`:"100%",
            lineHeight: `${data.option?.fontSize? data.option?.fontSize + 3: 18}px`,
            textAlign: 
                (data.option?.pozition == "center")?"center":
                (data.option?.pozition == "left")?"start":
                (data.option?.pozition == "right")?"end":
                undefined,
        }} 
        className={`constructor-component constructor-component-text`} 
    >{data.value}</Typography>
    )
}