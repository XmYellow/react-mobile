import React, { Component } from 'react'
import { List, InputItem, NavBar,Button,Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import {Link} from 'react-router'
import './Login.scss'
import logoImg from './../asserts/logo.jpg'

class Login extends Component {
  state = {
    focused: false,
  }
  failToast() {
  Toast.fail('登入失败!!!', 2);
 }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error,values) => {
      if (!error) {
        if(values.account=='123456'&&values.password=='123456'){
          //console.log(this.props.form.getFieldsValue());
          window.location.href = '/msgcenter'
        }else{
          Toast.fail('请输入正确的登入信息!!!', 2);
        }
      } else {
      this.failToast()
      }
    });
  }
  validateAccount = (rule, value, callback) => {
    var emailFilter =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
    var phoneFilter =/^1[3|4|5|7|8][0-9]{9}$/g
    if (emailFilter.test(value) && phoneFilter.test(value)) {
      callback();
    } else {
      callback(new Error('请输入手机号或邮箱'));
    }
  }
  render () {
    const { getFieldProps ,getFieldError} = this.props.form;
    return (
      <div>
        <NavBar
          iconName="null"
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={
            <Link to="/setting"><i className="ion-ios-gear-outline login-setting-btn"></i></Link>
          }
        > </NavBar>
        <div className="login-logo">
          <img src={logoImg} className="logoImg" alt=""/>
        </div>
        <List renderFooter={() => getFieldError('account') && getFieldError('account').join(',') ||getFieldError('password') && getFieldError('password').join(',')}>
          <InputItem
            {...getFieldProps('account', {
              rules: [
                { required: true, message: '请输入帐号' },
                //{ validator: this.validateAccount }
              ]
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
            Toast.info(getFieldError('account').join('、'));
          }}
            placeholder="请输入账号"
          >帐号</InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                { required: true, message: '请输入密码' },
              ]
            })}
            clear
            error={!!getFieldError('password')}
            onErrorClick={() => {
            Toast.info(getFieldError('password').join('、'));
          }}
            type="password"
            placeholder="请输入密码"

          >密码</InputItem>
        </List>
          <Button className="btn login" type="primary"  onClick={this.onSubmit} > 登入 </Button>
      </div>
    )
  }
}
const lo = createForm()(Login)
export default lo
