import React from 'react'
import './index.scss'

const Loading = ({ style }) => {
  return (
    <div className='loading_box' style={{ ...style }}>
      <div className='loading'>
        {Array(12)
          .fill()
          .map((item, index) => (
            <i key={index}></i>
          ))}
      </div>
    </div>
  )
}

export default Loading
