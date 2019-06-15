import React from 'react';
import { connect } from 'dva';
import { Checkbox,Form,Field,Table } from '@alifd/next';
import '@alifd/next/dist/next.css';

const { Group } = Checkbox;
const FormItem = Form.Item;
const {Column} = Table;

const formItemLayout = {
  labelCol: {
      fixedSpan: 10
  },
  wrapperCol: {
      span: 14
  }
};

const renderSize = (list) => {
  return list && list.map((item,index)=>{
    return (
      <div key={index}>{item}</div>
    )
  })
}

 class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.field = new Field(this,{onChange:this.onHandleChange.bind(this)});
  }
  onHandleChange(name,value){
    let data = {
      [name]:value
    }
    this.props.dispatch({type:'example/updateSelectedValue',payload:data})
  }
   componentDidMount(){
     this.props.dispatch({
       type:'example/handleData'
     })
    }
    
    render(){
      const init = this.field.init;
      const { checkBoxListData , tableData} = JSON.parse(JSON.stringify(this.props.example));
      console.log(tableData);
      return (
        <div>
          <Form 
            {...formItemLayout} 
            >
              {
              checkBoxListData && checkBoxListData.map((item,index)=>{
                  return (
                      <FormItem key={index} label={item.title+":"}>
                        <Group
                          dataSource={item.childList}
                          {...init(`${item.value}`)}
                        />
                      </FormItem>
                  )
                })
              }
          </Form>
          <Table
            dataSource = {tableData} 
          >
              <Column title="颜色" dataIndex="color"/>
              <Column title="尺寸" dataIndex="size" cell={renderSize}/>
              <Column title="形状" dataIndex="shape" cell={renderSize}/>
          </Table>
        </div>
        
      )
    }
}
IndexPage.propTypes = {
};
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(IndexPage);
