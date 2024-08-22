import {useEventListener} from './useEventListener'
import {useCallback, useRef, useState} from 'react'

type ElementDimensions = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

const useElementDimensions = () => {
  const ref = useRef(null)
  const [dimensions, setDimensions] = useState<ElementDimensions>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0
  })

  const refresh = useCallback(() => {
    const domRect = (ref.current as unknown as Element)?.getBoundingClientRect()

    if (domRect) {
      setDimensions(domRect)
    }
  }, [])

  useEventListener('resize', refresh);
  useEventListener('scroll', refresh, true);

  return {dimensions, ref, refresh}
}

export default useElementDimensions
