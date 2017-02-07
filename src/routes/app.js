import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './login'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin } from 'antd'
import { classnames } from '../utils'
import '../components/layout/common.less'

function App ({children, location, dispatch, app}) {
  // modal/app.js 中命名空间为app的项目。写起来还是不够直接，不够顺手。
  const {login, loading, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible} = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }
  //dispatch 进行触发 ，在这里loginProps是登录的属性。在login.js中有一个对应的onOk方法。
  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    }
  }

  return (
    <div>{login
        ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
        : <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>}</div>
  )
}
//children 是一个react element，那么他是什么呢？
//login true or false 来判断 
App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool
}

//  App 的属性又在哪里呢？
//https://github.com/zuiidea/antd-admin/issues/24
//react-router 
export default connect(({app}) => ({app}))(App)
