import { IComponents } from "../pageModels/pageModel";


export interface IDialog{
    name:string,
    title: string,
    components: IComponents[],
    query?: {[key:string]:string}
}