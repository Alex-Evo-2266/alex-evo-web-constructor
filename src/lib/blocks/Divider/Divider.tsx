import {Divider as DV} from 'alex-evo-sh-ui-kit'
import { IDivider } from '../../models/pageModels/pageModel'

export const Divider:React.FC<IDivider> = (data) => {
    return(
        <DV text={data.label}/>
    )
}