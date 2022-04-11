import React, { useRef, useState, useEffect } from 'react'
import './index.scss'

import Loading from './Loading'
import Bubble from './Bubble'

import { timeout } from '@/utils/index'

import BScroll from '@better-scroll/core'
import InfinityScroll from '@better-scroll/infinity'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import NestedScroll from '@better-scroll/nested-scroll'

BScroll.use(InfinityScroll)
BScroll.use(ObserveDOM)
BScroll.use(MouseWheel)
BScroll.use(PullDown)
BScroll.use(Pullup)
BScroll.use(NestedScroll)

let BS
let pullDownInitTop

const Scroll = ({
  children,
  pullingDown,
  pullingUp,
  scroll,
  infinity,
  fetch,
  render,
  infinityItemRef,
  tombstoneRef,
}) => {
  const [bubbleY, setBubbleY] = useState(0) // 气泡y坐标
  const [pullDownBefore, setPullDownBefore] = useState(true)
  //   const [pullUpNow, setPullUpNow] = useState(false)
  const [isRebounding, setIsRebounding] = useState(false)

  const pullDownRef = useRef(null)
  const wrapperRef = useRef(null)
  const scrollRef = useRef(null)

  const _infinity = {
    true: {
      fetch,
      render,
      createTombstone: () => tombstoneRef?.current.cloneNode(true),
    },
  }

  const initBScroll = () => {
    if (!scrollRef.current) {
      BS = scrollRef.current = new BScroll(wrapperRef.current, {
        probetype: 3,
        click: true,
        observeDOM: !infinity,
        mouseWheel: true,
        scrollY: true,
        scrollX: false,
        bounceTime: 600,
        pullDownRefresh: {
          //下拉刷新
          threshold: 90,
          stop: 50,
        },
        pullUpLoad: true, //上拉加载更多
        infinity: _infinity[infinity],
      })

      BS.on('scroll', e => {
        scroll?.(e)
        if (e.y < 0) return
        const posY = Math.floor(e.y)
        if (pullDownBefore) {
          setBubbleY(Math.max(0, posY + pullDownInitTop))
          pullDownRef.current.style.transform = `translate(-50%, ${Math.min(
            posY,
            -pullDownInitTop
          )}px`
        } else setBubbleY(0)
      })

      BS.on('pullingDown', async () => {
        setPullDownBefore(false)
        // setPullUpNow(true)
        console.log('刷新')
        await pullingDown?.(BS)
        // setPullUpNow(false)
        BS?.refresh()
        setIsRebounding(true)
        await timeout(500)
        BS?.finishPullDown()
        await timeout(500)
        setPullDownBefore(true)
        setIsRebounding(false)
        // BS?.refresh()
      })
      BS.on('pullingUp', () => {
        console.log('加载更多')
        pullingUp?.(BS)
        BS?.finishPullUp()
        // BS?.refresh()
      })
    }
  }

  useEffect(() => {
    initBScroll()
    pullDownInitTop =
      (pullDownRef?.current && parseInt(getComputedStyle(pullDownRef.current)?.top)) || -50
    return () => {
      BS?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='infinity view'>
      <div className='better_scroll_pulldown' ref={pullDownRef}>
        {pullDownBefore ? <Bubble y={bubbleY} /> : !isRebounding ? <Loading /> : <p>刷新完成</p>}
      </div>
      <div
        ref={wrapperRef}
        className='scroll-warpper'
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <ul className='scroll-content'>{children}</ul>
      </div>
      {/* <Loading /> */}
    </div>
  )
}

export default Scroll
