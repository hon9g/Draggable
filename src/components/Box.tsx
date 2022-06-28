import React from 'react'
import PropTypes from 'prop-types'
import './Box.css'

interface Props {
  title: String
}

const Box = ({ title }: Props) => {
  return (
  <div className={`box`}>
    <span className={`title`}>
      { title }
    </span>
  </div>
  )
}

Box.defaultProps = {
  title: 'Drag me!'
}

Box.propTypes = {
  title: PropTypes.string,
}

export default Box
