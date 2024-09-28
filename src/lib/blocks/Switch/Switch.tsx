import { Switch as SwitchByKit } from "alex-evo-sh-ui-kit"
import { ISwitch } from "../../models/pageModels/pageModel"
import { useAction } from "../../helper/actionHendler"
import { useCallback, useEffect, useState } from "react"


export const Switch:React.FC<ISwitch> = (props) => {

    const {changeHandler} = useAction()

    const [value, setValue] = useState<boolean>(props.value)

    useEffect(()=>{
        setValue(props.value)
    },[props.value])

    const _changeHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        changeHandler(props.action, e.target.checked?"1":"0")
        setValue(prev=>!prev)
    },[changeHandler])

    return(
        <div style={{
            display: "flex", 
            justifyContent: 
            (props.option?.pozition == "center")?"center":
            (props.option?.pozition == "left")?'start':
            (props.option?.pozition == "right")?"end":
            undefined
            }}>
            <SwitchByKit style={{}} checked={value} onChange={_changeHandler}/>
        </div>
        
    )
}