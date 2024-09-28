import { useCallback, useContext } from "react";
import { ActionFetchTarget, ActionType, BaseAction } from "../models/pageModels/pageModel";
import { WebConstructorContext } from "../blocks/WebConstructor";
import { DialogContext } from "../blocks/Dialog/Dialog";

type Quety = {
    [key: string]: string
}

function addQuery(url: string, quety: Quety = {}){
    return Object.entries(quety)
        .reduce((prev, current, index)=>`${prev}${!index?"?":"&"}${current[0]}=${current[1]}`, url)
}

export const useAction = () => {

    const context = useContext(WebConstructorContext)
    const contextDialog = useContext(DialogContext)

    const actionHendler = useCallback((action: BaseAction, event?:React.MouseEvent<HTMLElement, MouseEvent>)=>{
        if(action.action_type === ActionType.GET_REQUEST)
        {
            if(context.fetchFunction)
                context.fetchFunction(addQuery(action.action_target, action.query ?? {}), "GET", null, {})
            else
                new Error("fetch function not found")
        }
        else if(action.action_type === ActionType.LINK)
            window.location.replace(action.action_target);
        else if(action.action_type === ActionType.DIALOG)
            context.showDialog(action.action_target)
        else if(action.action_type === ActionType.SYSTEM)
            context.systemCall && context.systemCall.apply(this, [action.action_target, ...(action.arg ?? [])])
        else if(action.action_type === ActionType.MENU)
            if(event)
                context.showMenu && context.showMenu(action.action_target, event.clientX, event.clientY)
     
        if(contextDialog.hideDialog && contextDialog.index !== undefined && action.close_dialog)
            contextDialog.hideDialog()
    },[contextDialog])

    const changeHandler = useCallback((action: ActionFetchTarget, value: string | number)=>{
        if(action.action_type === ActionType.GET_REQUEST)
        {
            if(context.fetchFunction)
                context.fetchFunction(addQuery(action.action_target, {...action.query, value: String(value)}), "GET", null, {})
            else
                new Error("fetch function not found")
        }
        if(contextDialog.hideDialog && contextDialog.index && action.close_dialog)
            contextDialog.hideDialog()
    },[])

    return {actionHendler, changeHandler}
}

