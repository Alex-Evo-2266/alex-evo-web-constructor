import { Slider as SliderBase } from "alex-evo-sh-ui-kit"
import { ISlider } from "../../models/pageModels/pageModel"
import { useAction } from "../../helper/actionHendler"
import { useCallback, useRef } from "react"


export const Slider:React.FC<ISlider> = (props) => {

    const {changeHandler} = useAction()
    const timeoutID = useRef<NodeJS.Timeout | null>(null)

    const _changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if(timeoutID.current)
            clearTimeout(timeoutID.current)
        timeoutID.current = setTimeout(()=>{
            changeHandler(props.action, event.target.value)
        },200)
    },[changeHandler])

    return(
        <SliderBase style={{
            justifyContent: 
                (props.option?.pozition == "center")?"center":
                (props.option?.pozition == "left")?'start':
                (props.option?.pozition == "right")?"end":
                undefined, 
        }} onChange={_changeHandler} value={props.value} min={props.min} max={props.max} step={props.step}/>
    )
}