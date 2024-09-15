

import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';
import { TypeComponent } from '../lib/models/types';
import { ActionType } from '../lib/models/pageModels/pageModel';

const meta = {
  title: 'DemoPages/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    data:{
      name: "d",
      type: TypeComponent.COLUMNS,
      count: 3,
      value:[{indexCol:1, value: {
        type: TypeComponent.TEXT,
        name: "aefsr",
        value: "trst",
        option:{
          fontSize:45,
          pozition: "right"
        }
      }},
      {indexCol: 0, value: {
        type: TypeComponent.LIST,
        name: "list",
        value: [{
          type: TypeComponent.BUTTON,
          label: "test btn",
          name: "test btn",
          option:{
            pozition: "center"
          },
          action: {
            action_type: ActionType.GET_REQUEST,
            action_target: "/api/test"
          }
        },
        {
          type: TypeComponent.BUTTON,
          label: "test btn",
          name: "test btn",
          action: {
            action_type: ActionType.GET_REQUEST,
            action_target: "/api/test"
          }
        }]
      }},
      {indexCol: 2, value: {
        type: TypeComponent.LIST,
        name: "list",
        value: [
          {
            type:TypeComponent.KEY_VALUE,
            label: "test-key-1",
            value: {
              type: TypeComponent.TEXT,
              value: "test-value-1"
            }
          },
          {
            type: TypeComponent.DIVIDER,
          },
          {
            type:TypeComponent.KEY_VALUE,
            label: "test-key-2",
            value: {
              type: TypeComponent.TEXT,
              value: "test-value-2"
            }
          },
          {
            type: TypeComponent.DIVIDER,
            label: "test label"
          },
          {
            type:TypeComponent.KEY_VALUE,
            label: "test-key-3",
            value: {
              type: TypeComponent.BUTTON,
              label: "test-value-3",
              action: {action_type: ActionType.NONE}
            }
          }
        ]
      }},
      {
        indexCol: 1,
        value: {
          type: TypeComponent.CARD,
          label: "test card",
          action:{
            action_type :ActionType.NONE
          },
          value:{
            type: TypeComponent.LIST,
            name: "list",
            value: [
              {
                type:TypeComponent.KEY_VALUE,
                label: "test-key-1",
                value: {
                  type: TypeComponent.TEXT,
                  value: "test-value-1"
                }
              },
              {
                type: TypeComponent.DIVIDER,
              },
              {
                type:TypeComponent.KEY_VALUE,
                label: "test-key-2",
                value: {
                  type: TypeComponent.TEXT,
                  value: "test-value-2"
                }
              },
              {
                type:TypeComponent.KEY_VALUE,
                label: "test-key-3",
                value: {
                  type: TypeComponent.TEXT,
                  value: "test-value-3"
                }
              },
              {
                type: TypeComponent.FLEX_CONTAINER,
                option:{
                  pozition: 'right'
                },
                value:[{
                  type: TypeComponent.BUTTON,
                  label: "test btn",
                  name: "test btn",
                  option:{
                    pozition: "center"
                  },
                  action: {
                    action_type: ActionType.GET_REQUEST,
                    action_target: "/api/test"
                  }
                },
                {
                  type: TypeComponent.BUTTON,
                  label: "test btn",
                  name: "test btn",
                  option:{
                    backgroundColor: "red",
                    borderRadius: 4,
                    color: "#fff"
                  },
                  action: {
                    action_type: ActionType.GET_REQUEST,
                    action_target: "/api/test"
                  }
                }]
              }
            ]
          }
        }
      }]
    }
  },
};

export const Grid: Story = {
  args: {
   data:{
    type: TypeComponent.GRID_LAYOUT,
    value:[{
      type: TypeComponent.CARD,
      label: "Test",
      action: {
        action_type: ActionType.NONE
      }
    },{
      type: TypeComponent.CARD,
      label: "Test",
      action: {
        action_type: ActionType.NONE
      }
    },{
      type: TypeComponent.CARD,
      label: "Test",
      action: {
        action_type: ActionType.NONE
      }
    },{
      type: TypeComponent.CARD,
      label: "Test",
      value: {
        type: TypeComponent.TEXT,
        value: " sdgre swe yser yser ysyer hyer hy erhrd hd rth rdt hdrhj rdthj drhrhrd rt h rtrhh rdt htr h "
      },
      action: {
        action_type: ActionType.NONE
      }
    }]
   }
  },
};


