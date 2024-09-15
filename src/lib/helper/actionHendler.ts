import { useContext } from "react";
import { ActionType, BaseAction } from "../models/pageModels/pageModel";
import { WebConstructorContext } from "../blocks/WebConstructor";


export const useAction = () => {

    const context = useContext(WebConstructorContext)

    function actionHendler(action: BaseAction){
        if(action.action_type === ActionType.GET_REQUEST)
        {
            if(context.fetchFunction)
                context.fetchFunction(action.action_target, "GET", null, {})
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

    return {actionHendler}
}

