import { IMenuItem, IMenuSubItem, Menu as MenuKit } from "alex-evo-sh-ui-kit";
import { IMenuItem as IMenuItemConstructor, IMenuProps, IMenuSubItem as IMenuSubItemConstructor } from "../../models/menu/menu";
import { useCallback, useContext } from "react";
import { WebConstructorContext } from "../WebConstructor";
import { BaseAction } from "../../models/pageModels/pageModel";
import { useAction } from "../../helper/actionHendler";

interface MenuProps{
    data: IMenuProps
    hideMenu: ()=>void
}

export const Menu:React.FC<MenuProps> = ({data, hideMenu}) => {

    const {containerMenu, screenSize} = useContext(WebConstructorContext)
    const {actionHendler} = useAction()

    const getIcon = (_?: string) => undefined

    const _actionHendler = useCallback((action?:BaseAction) => {
        if(action)
            actionHendler(action)
        hideMenu()
    },[hideMenu, actionHendler])

    const mapMenuSubItem = (data?: IMenuSubItemConstructor[]):IMenuSubItem[] | undefined => {
        if(!data) return 
        return data.map(item=>({
            title: item.label,
            icon: getIcon(item.icon),
            activated: item.activated,
            onClick: ()=>_actionHendler(item.action),
        }))
    }

    const mapMenuItem = (data: IMenuItemConstructor[]):IMenuItem[] => {
        return data.map(item=>({
            title: item.label,
            icon: getIcon(item.icon),
            activated: item.activated,
            onClick: ()=>_actionHendler(item.action),
            subItems: mapMenuSubItem(item.subItems)
        }))
    }

    return(
        <MenuKit onHide={hideMenu} visible={data.visible} x={data.x} y={data.y} screensize={screenSize} container={containerMenu} blocks={[{items:mapMenuItem(data.components)}]} />
    )
}