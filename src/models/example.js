import {mockData} from '../../mock';

const log = console.log;
function calu(){
  return Array.prototype.reduce.call(arguments,(a,b)=>{
      let ret = [];
      a.forEach((a)=>{
        b.forEach((b)=>{
          ret.push(a.concat([b]));
        })
      });
      return ret;
  },[[]]);

}

export default {
  namespace: 'example',
  state: {
    mockData:mockData,
    selected:{
      // product_color:["blue", "whilt"],
      // product_size:["size_5", "size_7", "size_8"],
      // product_shape:["shape_aquare", "shape_round"]
    },
    tableData:[
      // {
      //   color:'blue',
      //   size:["size_5", "size_7", "size_8"],
      //   shape:["shape_aquare", "shape_round"]
      // },
      // {
      //   color:'whilt',
      //   size:["size_5", "size_7", "size_8"],
      //   shape:["shape_aquare", "shape_round"]
      // }
    ]
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    //处理后端请求过来的checkbox数据
    handleData(state){
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
      state.selected = {
        ...state.selected,
        ...action.payload
      }
      let res = Object.values(state.selected);
      let a = calu(...res);
      log(a);
      //根据选择的值进行table数据的改动
      // let newSelectValve = state.selected;
      // let newTable = [];
      // if(newSelectValve.hasOwnProperty('product_color')){
      //     let colorList = newSelectValve['product_color'];
      //     newTable = colorList.map(item=>{
      //       return {
      //         color:item,
      //         size:newSelectValve['product_size'],
      //         shape:newSelectValve['product_shape']
      //       }
      //     });
      //     log(newTable);
      // }
      // state.tableData = newTable;
      return state;
    },
   
    
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
