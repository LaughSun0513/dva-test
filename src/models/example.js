import {mockData} from '../../mock';

const log = console.log;

export default {
  namespace: 'example',
  state: {
    mockData:mockData,
    selected:{
      product_color:["blue", "whilt"],
      product_size:["size_5", "size_7", "size_8"],
      product_shape:["shape_aquare", "shape_round"]
    },
    tableData:[
      {
        color:'blue',
        size:"size_5",
        shape:"shape_aquare"
      },
      {
        color:'whilt',
        size:"size_7",
        shape: "shape_round"
      }
    ]
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    //处理后端请求过来的checkbox数据
    handleData(state){
      log(mockData);
      let checkBoxListData = state.mockData.data && state.mockData.data.map(item=>{
          let childList;
          if(item.children && item.children.length>0){
            childList= item.children.map(data=>{
              return {
                label:data.label,
                value:data.value
              }
            });
          }
          return {
            title:item.label,
            value:item.value,
            childList
          }
      })
      state.checkBoxListData = checkBoxListData;
      return state;
    },
    updateSelectedValue(state,action){
      log(action);
      let selectData = state.selected;
      return state;
    }
    
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

};
