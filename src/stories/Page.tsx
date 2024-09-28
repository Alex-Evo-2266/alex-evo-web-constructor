import React, { useEffect, useState } from 'react';
import { IComponents } from '../lib/models/pageModels/pageModel';
import { WebConstructor } from '../lib/blocks/WebConstructor';
import { Button, ScreenSize } from 'alex-evo-sh-ui-kit';

export interface IPage{
  data: IComponents
}

export const Page: React.FC<IPage> = ({data}) => {
  
  const fatchF = (url:string)=>{
    console.log(url)
  }

  const [vis, setVis] = useState<boolean>(false)

  const [c, setc] = useState<IComponents>(data)

  // const sert = (flag: boolean = false) => {
  //   setc(prev=>({...prev, value:{...prev.value, value:prev.value.value.map((item, index, arr)=>{
  //     if(arr.length - 1 === index)
  //       return({...item, value:{...item.value, value: flag}})
  //     return item
  //   })}}))
  // }

  useEffect(()=>{
    console.log(c)
  },[c])

  return (
    <div>
      <div id='modalRoot'></div>
      <Button onClick={()=>setVis(true)}>test</Button>
      {/* <Button onClick={()=>sert(false)}>test2</Button>
      <Button onClick={()=>sert(true)}>test2</Button> */}
      {
        vis && <WebConstructor 
        data={c} 
        fetchFunction={fatchF} 
        containerMenu={document.getElementById('modalRoot') ?? undefined} 
        containerModal={document.getElementById('modalRoot') ?? undefined}
        screenSize={ScreenSize.STANDART}
      />
      }
      
    </div>
  );
};
