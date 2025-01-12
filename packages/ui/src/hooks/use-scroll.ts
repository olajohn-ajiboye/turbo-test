import { useState, useEffect } from 'react'

export function useScroll(threshold = 0) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // const handleScroll = () => {
    //   setScrolled((window as any).scrollY > threshold)
    // }
    // window.addEventListener('scroll', handleScroll)
    // return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}