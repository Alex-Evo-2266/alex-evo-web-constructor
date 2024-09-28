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
        <div style={{}} className={`web-constructor-send-text ${isBlock?"block":""}`} ref={sendTextContainer}>
            <TextField border onChange={_changeHandler} value={text}/>
            <Button onClick={send}>send</Button>
        </div>
    )
}