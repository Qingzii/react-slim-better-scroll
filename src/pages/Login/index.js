import React from 'react'

import store from '@/store'
import { observer } from 'mobx-react-lite'

const Login = () => {
  const { setToken } = store
  return (
    <div className='login'>
      <ul>
        <li>Login</li>
        <li>
          <button onClick={e => setToken(true)}>登录</button>
        </li>
      </ul>
    </div>
  )
}
export default observer(Login)
