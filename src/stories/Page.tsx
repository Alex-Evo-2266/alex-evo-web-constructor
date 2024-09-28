import React, { useState } from 'react';
import { IComponents } from '../lib/models/pageModels/pageModel';
import { WebConstructor } from '../lib/blocks/WebConstructor';
import { Button, ScreenSize } from 'alex-evo-sh-ui-kit';
import { IDialog } from '../lib/models/dialog/dialog';
import { IMenu } from '../lib/models/menu/menu';

export interface IPage{
  data: IComponents
  dialogs?: IDialog[]
  menu?: IMenu[]
}

export const Page: React.FC<IPage> = ({data, dialogs = [], menu = []}) => {
  
  const fatchF = (url:string)=>{
    console.log(url)
  }

  const [vis, setVis] = useState<boolean>(false)

  const systemCall = (name:string, ...arg:any) => {
    console.log('systemCall', name, arg)
  }

  return (
    <div>
      <div id='modalRoot'></div>
      <Button onClick={()=>setVis(true)}>test</Button>
      {
        vis && <WebConstructor 
        data={data} 
        menu={menu}
        dialogs={dialogs}
        fetchFunction={fatchF} 
        containerMenu={document.getElementById('modalRoot') ?? undefined} 
        containerModal={document.getElementById('modalRoot') ?? undefined}
        screenSize={ScreenSize.STANDART}
        systemCall={systemCall}
      />
      }
      
    </div>
  );
};
