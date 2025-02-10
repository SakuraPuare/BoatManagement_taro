import {useEffect} from 'react'
import {useDidHide, useDidShow} from '@tarojs/taro'
// 全局样式
import "./app.css";
import "taro-icons/scss/FontAwesome.scss";

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
  })

  // 对应 onShow
  useDidShow(() => {
  })

  // 对应 onHide
  useDidHide(() => {
  })

  return props.children
}

export default App;
