import React, { useCallback, useEffect, useRef, useMemo, useState, ReactElement, ReactNode } from 'react'
import PropTypes from 'prop-types'

import './Draggable.css'

interface Props {
  children: ReactNode
}

const Draggable = ({ children }: Props) => {
  const draggableElement = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    translate: {x: 0, y: 0},
    pad: {x: 0, y: 0},
    isDragging: false
  })
  
  const handleDesktopDragStart = useCallback(({clientX, clientY}) => {
    const el = draggableElement.current
    if (el) {
      setState(state => ({
        ...state,
        pad: {
          x: el.clientWidth + state.translate.x - clientX,
          y: el.clientHeight + state.translate.y - clientY
        },
        isDragging: true
      }))
    }
  }, [])

  const handleMobileDragStart = useCallback(({touches}) => {
    const el = draggableElement.current
    if (el) {
      setState(state => ({
        ...state,
        pad: {
          x: el.clientWidth + state.translate.x - touches[0].clientX,
          y: el.clientHeight + state.translate.y - touches[0].clientY
        },
        isDragging: true
      }))
    }
  }, [])
  
  const handleDesktopDragging = useCallback(({clientX, clientY}) => {
    const el = draggableElement.current
    if (el) {
      const translateX = Math.min(
        window.innerWidth + state.pad.x - el.clientWidth,
        clientX + state.pad.x - el.clientWidth
      )
      const translateY = Math.min(
        window.innerHeight + state.pad.y- el.clientHeight,
        clientY + state.pad.y - el.clientHeight
      )
      setState(state => ({
        ...state,
        translate: {x: translateX, y: translateY}
      }))
    }
  }, [state.pad])

  const handleMobileDragging = useCallback(({touches}) => {
    const el = draggableElement.current
    if (el) {
      const translateX = Math.min(
        window.innerWidth  + state.pad.x - el.clientWidth,
        touches[0].clientX  + state.pad.x - el.clientWidth
      )
      const translateY = Math.min(
        window.innerHeight + state.pad.y - el.clientHeight,
        touches[0].clientY + state.pad.y - el.clientHeight
      )
      setState(state => ({
        ...state,
        translate: {x: translateX, y: translateY}
      }))
    }
  }, [state.pad])

  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false
    }))
  }, [])

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleDesktopDragging)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleMobileDragging)
      window.addEventListener('touchend', handleDragEnd)
    } else {
      window.removeEventListener('mousemove', handleDesktopDragging)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleMobileDragging)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [state.isDragging, handleDragEnd, handleDesktopDragging, handleMobileDragging])

  const styles = useMemo(() => {
    const el = draggableElement.current
    return({
      cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
      transform: `translate(
        ${Math.min(
          window.innerWidth - (el ? el.clientWidth : 0),
          Math.max(state.translate.x, 0)
        )}px,
        ${Math.min(
          window.innerHeight - (el ? el.clientHeight : 0),
          Math.max(state.translate.y, 0)
        )}px)
      `,
      zIndex: state.isDragging ? 2 : 1,
    })
  }, [state.isDragging, state.translate])

  return (
  <div className={`draggable`}
    style={styles}
    onMouseDown={handleDesktopDragStart}
    onTouchStart={handleMobileDragStart}
    ref={draggableElement}
  >
    { children }
  </div>
  )
}

Draggable.propTypes = {
  children: PropTypes.element.isRequired
}

export default Draggable
