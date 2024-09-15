import { createContext } from 'react'
import { IComponents } from '../models/pageModels/pageModel'
import {Component} from './Component/Component'

type FetchFunction = (
    url:string, 
	method?: string,
	body?:BodyInit | null,
	headers?: HeadersInit) => void
    
interface IWebConstructorContext{
    fetchFunction?: FetchFunction
}

interface IWebConstructor{
    data: IComponents,
    fetchFunction?: FetchFunction
}

export const WebConstructorContext = createContext<IWebConstructorContext>({})

export const WebConstructor:React.FC<IWebConstructor> = ({data, fetchFunction}) => {

    return(
        <WebConstructorContext.Provider value={{fetchFunction}}>
            <Component data={data}/>
        </WebConstructorContext.Provider>
    )
}