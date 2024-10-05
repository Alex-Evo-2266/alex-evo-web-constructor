import { Table as BaseTable, IColumn, IDataItem, JsonContainer} from "alex-evo-sh-ui-kit"
import { IColTable, ITable, TypeColumn } from "../../models"
import { useAction } from "../../helper/actionHendler"
import { useCallback } from "react"



export const Table:React.FC<ITable>  = (data) => {

    const {actionHendler} = useAction()

    const mapCols = (cols:IColTable[]):IColumn[] => {
        return cols.map((item)=>{
            const col:IColumn = {
                title: item.label,
                field: item.key,
                backgroundColor: item.backgroundColor,
                color: item.color
            }
            if(item.typeCol === TypeColumn.JSON)
                col.template = (cell)=>{
                    const json = String(cell[0].content)
                    return <JsonContainer name={item.key} data={json}/>
                }
            return col
        })
    }

    const clickHandler = useCallback((dataItem:IDataItem, index:number) => {
        if(!data.action) return;
        actionHendler(data.action, undefined, {index: String(index)})
    },[actionHendler])

    return(
        <BaseTable columns={mapCols(data.cols)} data={data.row} onClickRow={clickHandler}/>
    )
}