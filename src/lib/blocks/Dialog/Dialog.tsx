import { DialogModal, FullScrinTemplateDialog } from "alex-evo-sh-ui-kit"
import { createContext, useCallback, useContext } from "react"
import { WebConstructorContext } from "../WebConstructor"
import { IDialog } from "../../models/dialog/dialog"
import { Component } from "../Component/Component"


interface DialogProps {
    data: IDialog
    index: number
    hideDialog: (index: number)=>void
}

interface IDialogContext{
    index?: number
    hideDialog?:()=>void
    query?:{
        [key:string]:string
    }
}

export const DialogContext = createContext<IDialogContext>({})

export const Dialog = ({data, index, hideDialog}:DialogProps) => {

    const {containerModal} = useContext(WebConstructorContext)

    const _hideDialog = useCallback(()=>{
        hideDialog(index)
    },[index, hideDialog])

    return(
        <DialogModal container={containerModal}>
            <DialogContext.Provider value={{index, hideDialog: _hideDialog, query: data.query}}>
                <FullScrinTemplateDialog header={data.title} onHide={_hideDialog}>
                {
                    data.components.map((item, index2)=>(
                        <Component key={`dialog-${index}-component-${index2}`} data={item}/>
                    ))
                }
                </FullScrinTemplateDialog>
            </DialogContext.Provider>
        </DialogModal>
    )
}