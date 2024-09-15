import React from 'react';
import { IComponents } from '../lib/models/pageModels/pageModel';
import { WebConstructor } from '../lib/blocks/WebConstructor';

export interface IPage{
  data: IComponents
}

export const Page: React.FC<IPage> = ({data}) => {

  return (
    <div>
      <WebConstructor data={data}/>
    </div>
  );
};
