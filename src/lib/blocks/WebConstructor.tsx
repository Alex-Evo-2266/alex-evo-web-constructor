import { createContext } from 'react'
import { IComponents } from '../models/pageModels/pageModel'
import {Component} from './Component/Component'
import { ScreenSize } from 'alex-evo-sh-ui-kit'

type FetchFunction = (
    url:string, 
	method?: string,
	body?:BodyInit | null,
	headers?: HeadersInit) => void
    
interface IWebConstructorContext{
    fetchFunction?: FetchFunction,
    containerModal?: HTMLElement,
    containerMenu?: HTMLElement,
    screenSize: ScreenSize
}

interface IWebConstructor{
    data: IComponents,
    fetchFunction?: FetchFunction,
    containerModal?: HTMLElement,
    containerMenu?: HTMLElement,
    screenSize: ScreenSize
}

export const WebConstructorContext = createContext<IWebConstructorContext>({screenSize: ScreenSize.STANDART})

export const WebConstructor:React.FC<IWebConstructor> = ({data, fetchFunction, containerMenu, containerModal, screenSize}) => {

    return(
        <WebConstructorContext.Provider value={{fetchFunction, containerMenu, containerModal, screenSize}}>
            <Component data={data}/>
        </WebConstructorContext.Provider>
    )
}