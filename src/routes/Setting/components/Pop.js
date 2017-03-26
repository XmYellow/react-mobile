import React, { Component } from 'react'
import { Button, List, InputItem } from 'antd-mobile'
import './Setting.scss'

export class PopupContent extends React.Component {
  state = {
    sel: '',
  }
  onSel = (sel) => {
    this.setState({sel})
    this.props.onClose()
  }

  render () {
    return (
      <div>
        <List renderHeader={() => `服务器地址设置：${this.state.sel}`}>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            onClick={() => { this.onSel('原地址：http://safe.xxxxxx.com/pid/1234151234xx.com/pid/1234151') }}
          >原地址：http://safe.xxxxxx.com/pid/1234151234xx.com/pid/1234151</List.Item>
          <InputItem
            value={this.state.val}
            onChange={val => this.setState({val})}
            placeholder="请输入新的地址"
          />

        </List>
        <Button className="btn am-button-primary fix-btn"
                onClick={e => console.log(e)}
        >确认修改</Button>
      </div>
    )
  }
}
