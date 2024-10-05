import { Button } from "alex-evo-sh-ui-kit"
import React from "react"
import { IButton } from "../../models/pageModels/pageModel"
import { useAction } from "../../helper/actionHendler"

export const ButtonComponent:React.FC<IButton> = (data) => {

    const {actionHendler} = useAction()

    return (
        <div style={{
            display: 'flex',
            justifyContent:
            (data.option?.pozition == "center")?"center":
            (data.option?.pozition == "left")?"start":
            (data.option?.pozition == "right")?"end":
            undefined
            }}>
            <Button style={{
                color: data.option?.color, 
                backgroundColor: data.option?.backgroundColor, 
                borderRadius: (data.option?.borderRadius)?`${data.option?.borderRadius ?? 0}px`:undefined,
                fontSize:(data.option?.fontSize)?`${data.option?.fontSize ?? 18}px`:undefined,
                width: (data.option?.width)?`${data.option?.width}px`:undefined,
                minWidth: (data.option?.width)?`${data.option?.width}px`:undefined,
                height: (data.option?.height)?`${data.option?.height}px`:undefined,
                padding: data.option?.padding,
                margin: data.option?.margin,
            }} onClick={(e)=>actionHendler(data.action, e)}>{data.label}</Button>
        </div>
        )
}