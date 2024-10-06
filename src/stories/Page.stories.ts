

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
    dialogs:[],
    data:{
      name: "d",
      type: TypeComponent.COLUMNS,
      count: 3,
      option:{
      },
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
              option:{
                pozition: 'center',
              },
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
                  option:{
                    pozition: 'center',
                  },
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
    dialogs:[],
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
      option:{
        width: 400,
        pozition: 'center'
      },
      action: {
        action_type: ActionType.NONE
      },
      value:{
        type: TypeComponent.TEXT,
        value: "sdfgh"
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

export const Card: Story = {
  args: {
    menu:[{
      name:"test-menu",
      components:[{
        label: "t1",
        subItems:[{
          label: "s1",
          action:{
            action_type: ActionType.DIALOG,
            action_target: "test-dialog"
          }
        }]
      },{
        label: "t2",
        action:{
          action_type: ActionType.GET_REQUEST,
          action_target: "rgh/sdrh/sdh"
        }
      }]
    }],
    dialogs:[{
      name:"test-dialog",
      title: "Test dialog",
      components:[{
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
              option:{
                pozition: 'center',
              },
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
                action_target: "/api/test",
                close_dialog: true
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
                action_type: ActionType.SYSTEM,
                action_target: "add dev",
                arg:["sgsdg", "sgh", {sdg: "dsg"}]
              }
            }]
          }
        ]
      }]
    }],
   data:{
    type: TypeComponent.PANEL,
    option:{
    },
    value:{
      type: TypeComponent.COLUMNS,
      count: 2,
      value:[{
        indexCol: 0,
        value:{
          type: TypeComponent.LIST,
          value:[{
            type: TypeComponent.TEXT,
            value: "srhtdrhb hjd ht rsehdrthjdrth tjhdrtjdr jrtjrdtj rtjtrjdrtjrdtj rtjdrtj rtjdrjrtj drtj"
          }]
        }
      },{
        indexCol: 1,
        value:{
          type: TypeComponent.SLIDER,
          value: 20,
          action:{
            action_type: ActionType.GET_REQUEST,
            action_target: "test/url",
            query:{
              test: "test"
            }
          }
        }
      },{
        indexCol: 1,
        value:{
          type: TypeComponent.SELECT,
          value: "20",
          items:["20", "ethr", "sgrdth"],
          action:{
            action_type: ActionType.GET_REQUEST,
            action_target: "test/url2"
          }
        }
      },{
        indexCol: 1,
        value:{
          type: TypeComponent.SWITCH,
          value: true,
          action:{
            action_type: ActionType.GET_REQUEST,
            action_target: "test/url2"
          }
        }
      },{
        indexCol: 1,
        value:{
          type: TypeComponent.SEND_TEXT,
          value: "test",
          action:{
            action_type: ActionType.GET_REQUEST,
            action_target: "test/url2"
          }
        }
      },
      {
        indexCol: 1,
        value:{
          type: TypeComponent.BUTTON,
          label: "test dialog",
          action:{
            action_type: ActionType.DIALOG,
            action_target: "test-dialog",
            query:{
              test: "sddfhg"
            }
          }
        }
      },
      {
        indexCol: 1,
        value:{
          type: TypeComponent.BUTTON,
          label: "test menu",
          action:{
            action_type: ActionType.MENU,
            action_target: "test-menu",
            query:{
              test_menu:"test56"
            }
          }
        }
      },
      {
        indexCol: 1,
        value:{
          type: TypeComponent.TABLE,
          action:{action_type: ActionType.GET_REQUEST, action_target:"/sdfg/sdgfhf"},
          cols: [{
            label: "test1",
            key: "k1"
          },{
            label: "test2",
            key: "k2"
          },{
            label: "test3",
            key: "k3"
          }],
          row:[{
            k1: "rghdrth",
            k2: "tgh65",
            k3: "gk7",
          },{
            k1: "srhtj",
            k2: "54",
            k3: "74658",
          },{
            k1: "rhjf",
            k3: "dfgj",
          }]
        },
      }]
    }
   }
  },
};
