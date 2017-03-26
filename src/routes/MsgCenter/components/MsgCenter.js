import React, { Component } from 'react'
import { NavBar, WingBlank, createTooltip, Slider, Popup } from 'antd-mobile'
import { Link } from 'react-router'
import './MsgCenter.scss'
const SliderWithTooltip = createTooltip(Slider)

export default class MsgCenter extends Component {
  log = (name) => {
    return (value) => {
      console.log(`${name}: ${value}`)
    }
  }
  state = {
    sel: '',
  }
  onSel = (sel) => {
    this.setState({sel})
    this.props.onClose()
  }
  onMaskClose = () => {
    console.log('onMaskClose')
  }
  onClick = (e) => {
    let o = this
    e.preventDefault() // 修复 Android 上点击穿透
    Popup.show(<PopupContent onClose={() => Popup.hide()}/>, o.onMaskClose())
  }

  render () {

    return (
      <div>
        <NavBar leftContent="返回"
                onLeftClick={() => console.log('onLeftClick')}
        >设置</NavBar>
        <WingBlank>

          <p className="setting-title">通知设置</p>
          <div className="set-voice">
            <div className="voice-title">通知音量设置</div>
            <div className="voice-ctrl">
              <SliderWithTooltip
                defaultValue={26}
                min={0}
                max={30}
                onChange={this.log('change')} onAfterChange={this.log('afterChange')}
              />
            </div>
          </div>

          <p className="setting-title">服务器地址设置</p>
          <div className="url-setting-box">
            <div className="url-setting">http://safe.xxxxxx.com/pid/1234151234xx.com/pid/1234151</div>
            <div className="url-setting-btn" onClick={this.onClick}>修改</div>
          </div>
        </WingBlank>
      </div>
    )
  }
}
