import { useContext } from "react";
import { ActionFetchTarget, ActionType, BaseAction } from "../models/pageModels/pageModel";
import { WebConstructorContext } from "../blocks/WebConstructor";

type Quety = {
    [key: string]: string
}

function addQuery(url: string, quety: Quety = {}){
    return Object.entries(quety)
        .reduce((prev, current, index)=>`${prev}${!index?"?":"&"}${current[0]}=${current[1]}`, url)
}

export const useAction = () => {

    const context = useContext(WebConstructorContext)

    function actionHendler(action: BaseAction){
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
        {
    
        }
        else if(action.action_type === ActionType.MENU)
        {
    
        }
    }

    function changeHandler(action: ActionFetchTarget, value: string | number){
        if(action.action_type === ActionType.GET_REQUEST)
        {
            if(context.fetchFunction)
                context.fetchFunction(addQuery(action.action_target, {...action.query, value: String(value)}), "GET", null, {})
            else
                new Error("fetch function not found")
        }
    }

    return {actionHendler, changeHandler}
}

