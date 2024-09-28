export * from './types'

export * from './pageModels/optionComponents'
export * from './pageModels/pageModel'
export * from './pageModels/table'

export * from './menu/menu'

export * from './dialog/dialog'

export type FetchFunction = (
    url:string, 
	method?: string,
	body?:BodyInit | null,
	headers?: HeadersInit) => void