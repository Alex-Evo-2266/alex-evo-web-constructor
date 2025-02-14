import { JsonContainer } from "alex-evo-sh-ui-kit"
import { IJSON } from "../../models/pageModels/pageModel"
import { useMemo } from "react"

export const JSONComponent:React.FC<IJSON> = (data) => {

    const value = useMemo(()=>convertValue(data.value), [data])

    function convertValue(value: any){
        let newVal = value
        try{
            newVal = JSON.parse(newVal)
        }
        catch{}
        return newVal
    }

    

    return(
        <JsonContainer readonly data={value} name={data.name??"noname"}/>
    // <Typography
    //     type='body'
    //     style={{
    //         display: 'block',
    //         color: data.option?.color, 
    //         padding: data.option?.padding ?? '5px',
    //         margin: data.option?.margin,
    //         backgroundColor: data.option?.backgroundColor, 
    //         borderRadius:`${data.option?.borderRadius ?? 0}px`,
    //         fontSize:`${data.option?.fontSize ?? 18}px`,
    //         width: (data.option?.width)?`${data.option?.width}px`:"100%",
    //         minWidth: (data.option?.width)?`${data.option?.width}px`:"100%",
    //         height: (data.option?.height)?`${data.option?.height}px`:"100%",
    //         lineHeight: `${data.option?.fontSize? data.option?.fontSize + 3: 18}px`,
    //         textAlign: 
    //             (data.option?.pozition == "center")?"center":
    //             (data.option?.pozition == "left")?"start":
    //             (data.option?.pozition == "right")?"end":
    //             undefined,
    //     }} 
    //     className={`constructor-component constructor-component-text`} 
    // >{data.value}</Typography>
    )
}