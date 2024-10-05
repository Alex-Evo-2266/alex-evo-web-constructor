import { Button, TextField } from "alex-evo-sh-ui-kit"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAction } from "../../helper/actionHendler"
import { ISendText } from "../../models/pageModels/pageModel"

import './SendText.scss'



export const SendText:React.FC<ISendText> = (props) => {

    const [text, setText] = useState<string>(props.value ?? "")
    const {changeHandler} = useAction()
    const sendTextContainer = useRef<HTMLDivElement>(null)
    const [isBlock, setBlock] = useState<boolean>(true)

    const _changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const send = useCallback(() => {
        changeHandler(props.action, text)
    },[text, changeHandler])

    const resize = () =>{
        if(!sendTextContainer.current)return;
        const rects = sendTextContainer.current.getClientRects()[0]
        if(rects.width > 300)
            setBlock(false)
        else
            setBlock(true)
    }

    useEffect(()=>{
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    },[])

    return(
        <div style={{
            color: props.option?.color, 
            padding: props.option?.padding,
            margin: props.option?.margin,
            width: (props.option?.width)?`${props.option?.width}px`:"100%",
            minWidth: (props.option?.width)?`${props.option?.width}px`:"100%",
            height: (props.option?.height)?`${props.option?.height}px`:"100%",
            lineHeight: `${props.option?.fontSize? props.option?.fontSize + 3: 18}px`,
            justifyContent:
            (props.option?.pozition == "center")?"center":
            (props.option?.pozition == "left")?"start":
            (props.option?.pozition == "right")?"end":
            undefined
        }} className={`web-constructor-send-text ${isBlock?"block":""}`} ref={sendTextContainer}>
            <TextField styleContainer={{
                fontSize:props.option?.fontSize ?? `${props.option?.fontSize}px`,
                borderRadius:props.option?.borderRadius ?? `${props.option?.borderRadius}px`,
            }} border onChange={_changeHandler} value={text}/>
            <Button style={{
                borderRadius:props.option?.borderRadius ?? `${props.option?.borderRadius}px`,
                fontSize:props.option?.fontSize ?? `${props.option?.fontSize}px`,
                backgroundColor: props.option?.backgroundColor, 
                color: props.option?.color, 
            }} onClick={send}>send</Button>
        </div>
    )
}