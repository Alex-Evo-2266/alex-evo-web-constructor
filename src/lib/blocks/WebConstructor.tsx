import React, { createContext, useCallback, useState } from 'react'
import { IComponents } from '../models/pageModels/pageModel'
import {Component} from './Component/Component'
import { ScreenSize } from 'alex-evo-sh-ui-kit'
import { IDialog } from '../models/dialog/dialog'
import { Dialog } from './Dialog/Dialog'
import { Menu } from './Menu/Menu'
import { IMenu, IMenuProps } from '../models/menu/menu'
import { FetchFunction } from '../models'

interface IWebConstructorContext{
    fetchFunction?: FetchFunction,
    showDialog:(nameDialog:string)=>void
    containerModal?: HTMLElement,
    containerMenu?: HTMLElement,
    screenSize: ScreenSize,
    showError?: (title: string, message: string)=>void
    showMenu?: (name:string ,x:number, y:number)=>void
    systemCall?: (name: string, ...arg:any)=>void
}

interface IWebConstructor{
    data: IComponents,
    dialogs: IDialog[],
    menu: IMenu[],
    fetchFunction?: FetchFunction,
    containerModal?: HTMLElement,
    containerMenu?: HTMLElement,
    screenSize: ScreenSize,
    showError?: (title: string, message: string)=>void
    systemCall?: (name: string, ...arg:any)=>void
}

export const WebConstructorContext = createContext<IWebConstructorContext>({screenSize: ScreenSize.STANDART, showDialog:(_)=>{}})

export const WebConstructor:React.FC<IWebConstructor> = ({data, fetchFunction, containerMenu, containerModal, screenSize, dialogs, menu, showError, systemCall}) => {

    const [dialogsArr, setDialogs] = useState<IDialog[]>([])
    const [_menu, setMenu] = useState<IMenuProps>({
        components: [],
        x: 0,
        y: 0,
        visible: false
    })

    const showDialog = useCallback((nameDialog:string) => {
        const dialog = dialogs.find(item=>item.name === nameDialog)
        if(dialog)
            setDialogs(props=>[...props, dialog])
        else
            showError && showError("dialog not found", "")
    },[dialogs])

    const hideDialog = useCallback((index: number)=>{
        setDialogs(prev=>prev.filter((_, index2)=>index !== index2))
    },[])

    const showMenu = useCallback((name:string ,x:number, y:number)=>{
        const _menu = menu.find(item=>item.name === name)
        if(_menu)
            setMenu({x, y, components:_menu.components, visible: true})
        else
            showError && showError("menu not found", "")
    },[menu])

    const hideMenu = useCallback(()=>{
        setMenu(prev=>({...prev, visible: false}))
    },[])

    return(
        <WebConstructorContext.Provider value={{fetchFunction, containerMenu, containerModal, screenSize, showDialog, showError, showMenu, systemCall}}>
            <Component data={data}/>
            {
                dialogsArr.map((item, index)=>
                    (<React.Fragment key={index}>
                        <Dialog hideDialog={hideDialog} data={item} index={index}/>
                    </React.Fragment>)
                )
            }    
            <Menu data={_menu} hideMenu={hideMenu}/>        
        </WebConstructorContext.Provider>
    )
}