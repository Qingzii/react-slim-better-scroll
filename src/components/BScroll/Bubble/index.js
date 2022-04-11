import React, { useRef, useState, useEffect } from 'react'
import './index.scss'

let headCenter
const Bubble = ({ y = 0, pullDown, style }) => {
  const bubble = useRef(null),
    [width] = useState(50 * 2),
    [height] = useState(80 * 2),
    [ratio] = useState(window.devicePixelRatio),
    [initRadius] = useState(18 * ratio),
    [minHeadRadius] = useState(12 * ratio),
    [minTailRadius] = useState(5 * ratio),
    [initArrowRadius] = useState(10 * ratio),
    [minArrowRadius] = useState(6 * ratio),
    [arrowWidth] = useState(3 * ratio),
    [maxDistance] = useState(40 * ratio),
    [initCenterX] = useState(25 * ratio),
    [initCenterY] = useState(25 * ratio)
  headCenter = { x: initCenterX, y: initCenterY }

  const distance = () => Math.max(0, Math.min(y * ratio, maxDistance))
  const _style = () => ({ width: `${width / ratio}px`, height: `${height / ratio}px` })

  const _draw = () => {
    let ctx = bubble?.current.getContext('2d')
    ctx.clearRect(0, 0, bubble.current.width, bubble.current.height)

    _drawBubble(ctx)

    _drawArrow(ctx)
  }

  const _drawBubble = async ctx => {
    ctx.save()
    ctx.beginPath()

    const rate = distance() / maxDistance
    const headRadius = initRadius - (initRadius - minHeadRadius) * rate

    headCenter.y = initCenterY - (initRadius - minHeadRadius) * rate

    // 画上半弧线
    ctx.arc(headCenter.x, headCenter.y, headRadius, 0, Math.PI, true)

    // 画左侧贝塞尔
    const tailRadius = initRadius - (initRadius - minTailRadius) * rate
    const tailCenter = {
      x: headCenter.x,
      y: headCenter.y + distance(),
    }

    const tailPointL = {
      x: tailCenter.x - tailRadius,
      y: tailCenter.y,
    }
    const controlPointL = {
      x: tailPointL.x,
      y: tailPointL.y - distance() / 2,
    }

    ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y)

    // 画下半弧线
    ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)

    // 画右侧贝塞尔
    const headPointR = {
      x: headCenter.x + headRadius,
      y: headCenter.y,
    }
    const controlPointR = {
      x: tailCenter.x + tailRadius,
      y: headPointR.y + distance() / 2,
    }
    ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y)

    ctx.fillStyle = 'rgb(170,170,170)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(153,153,153)'
    ctx.stroke()
    ctx.restore()
  }

  const _drawArrow = ctx => {
    ctx.save()
    ctx.beginPath()

    const rate = distance() / maxDistance
    const arrowRadius = initArrowRadius - (initArrowRadius - minArrowRadius) * rate

    // 画内圆
    ctx.arc(headCenter.x, headCenter.y, arrowRadius - (arrowWidth - rate), -Math.PI / 2, 0, true)

    // 画外圆
    ctx.arc(headCenter.x, headCenter.y, arrowRadius, 0, (Math.PI * 3) / 2, false)

    ctx.lineTo(headCenter.x, headCenter.y - arrowRadius - arrowWidth / 2 + rate)
    ctx.lineTo(
      headCenter.x + arrowWidth * 2 - rate * 2,
      headCenter.y - arrowRadius + arrowWidth / 2
    )

    ctx.lineTo(headCenter.x, headCenter.y - arrowRadius + (arrowWidth * 3) / 2 - rate)

    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fill()
    ctx.strokeStyle = 'rgb(170,170,170)'
    ctx.stroke()
    ctx.restore()
  }

  useEffect(() => {
    _draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y])

  return <canvas ref={bubble} width={width} height={height} style={{ ..._style(), ...style }} />
}
export default Bubble
