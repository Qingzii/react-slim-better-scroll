import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import '@/utils/setRem'
import '@/assets/css/global.scss'
import '@/assets/css/normalize.min.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
module.hot?.accept()
