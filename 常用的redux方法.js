getModalSelectKeys(parmas).then(res => {
    // this.setState({
    //   ModalTableData:res.list
    // })
    this.props.dispatch(BodyTableDataAction())
  })
  //调用fetch方法
componentWillMount() { //页面将要加载

    this.props.dispatch(BodyTableDataAction())
  }
  //页面加载dispatch
<Col span={2}>
  <Select showSearch Placeholder="更多操作" onSelect={this.ActionMore} style={{
    width: '100%'
  }} defaultValue="更多操作">
    <Option value="over">分离</Option>
  </Select>
   <TacticeModal {...this.props}
     MoreVisible={this.state.MoreVisible}
     MorehandleOk={this.MorehandleOk}
     MorehandleCancel={this.MorehandleCancel}
    />

</Col>
//子组件继承父组件的方法
this.props.dispatch({
    type: ACTION.TABLEHAVECL
  })
  //清空数据
notification.config({
  placement: 'topRight',
  top: 55,
  duration: 3,
});

// notification  提示框的配置属性.
// 在Table中添加rowKey='id'
// 比如你的数据主键是 uid
return <Table rowKey="id" />;
// 或
return <Table rowKey={record => record.uid} />;
// 为了防止出现react需要的key问题.

del(`/v3/users/${userId}`).then(res => {
  //fail
  console.log(res);
}, res => {
  //success
  console.log(res);
  this.props.dispatch(getUserTableAction());
})

// del删除一个用户的方法
rowSelection: {
  // type:"radio",
  // selectedRowKeys:results,
  getCheckboxProps(value) {
    return {
      defaultChecked: true,
      disabled: true
    }
  },
  onChange: (selectedRows, selectedRowKeys) => {
    // console.log(selectedRows)
    // console.log(record);

  },
  // onSelect:(selectedRows,record, selectedRowKeys)=>{
  //     console.log(selectedRows);
  //     console.log(selectedRowKeys);
  //     console.log(record);
  // }
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
    this.setState({
      selectedRows: selectedRows
    })
  },

}
