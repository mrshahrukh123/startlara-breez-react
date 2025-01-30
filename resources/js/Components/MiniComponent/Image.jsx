import React from 'react'

export default function Image({ src="", alt="", imageClass="", imageStyle={} }) {
  return (
    <img src={src} alt={alt} style={imageStyle} className={imageClass} />
  )
}
