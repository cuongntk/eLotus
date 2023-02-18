import { useLayoutEffect, useState } from 'react'

function useWindowSize(width, isLess = false) {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      const currentWidth = isLess ? global.window.innerWidth < width : global.window.innerWidth > width
      setSize(currentWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const isLaptop = () => useWindowSize(1507, true)

const isDesktop = () => useWindowSize(1200)

const isTablet = () => useWindowSize(991, true)

const isMobile = () => useWindowSize(768, true)

export default { isLaptop, isDesktop, isMobile, isTablet }
