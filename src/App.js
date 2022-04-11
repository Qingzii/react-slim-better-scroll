import React, { useRef } from 'react'
import './app.scss'
import { API } from '@/api'
import store from '@/store'
import { observer } from 'mobx-react-lite'
import BScroll from '@/components/BScroll'

let page = 1
const App = () => {
  const infinityItemRef = useRef(null)
  const tombstoneRef = useRef(null)

  const pullingDown = async () => {
    const res = await API.intelligence_list({
      sub_type: 82,
      short_name_zh: '英超',
      page: 1,
      page_size: 20,
    })
    console.log(res)
    return res
  }

  const fetch = async count => {
    count = Math.max(20, count)
    const res = await API.intelligence_list({
      sub_type: 82,
      short_name_zh: '英超',
      page,
      page_size: count,
    })
    const _res = new Promise((resolve, reject) => {
      if (res?.code === 200) {
        const { list, page_data } = res.data
        if (page++ > page_data?.page_count) {
          resolve(false)
        } else {
          let items = []
          for (let item of list) {
            items.push(new Promise(resolve => resolve(item)))
          }
          resolve(Promise.all(items))
        }
      }
    })
    console.log(_res)
    return _res
  }
  const render = (item, div) => {
    let li = div || infinityItemRef.current.cloneNode(true)
    li.dataset.id = item.id
    let img = li.querySelector('.page_img')
    let title = li.querySelector('.title')
    let description = li.querySelector('.description')
    img.src = item.away_icon
    title.innerHTML = item.home_name
    description.innerHTML = item.match_time
    li.onclick = () => console.log(item)
    return li
  }

  return (
    <div className='App' style={{ height: `${store.globalHeight}px` }}>
      <BScroll
        infinity
        fetch={fetch}
        render={render}
        pullingDown={pullingDown}
        tombstoneRef={tombstoneRef}
        infinityItemRef={infinityItemRef}
      ></BScroll>
      <div className='template'>
        <li className='infinity-item' ref={infinityItemRef} onClick={e => console.log('---')}>
          <img className='page_img' src='' alt='' />
          <div>
            <p className='title'></p>
            <p className='description'></p>
          </div>
        </li>
        <li className='infinity-item tombstone' ref={tombstoneRef} style={{ minHeight: 95.63 }}>
          <img className='page_img' src={require('@/assets/image/avatar.jpg').default} alt='' />
          <div>
            <p className='title'></p>
            <p className='description'></p>
          </div>
        </li>
      </div>
    </div>
  )
}

export default observer(App)
