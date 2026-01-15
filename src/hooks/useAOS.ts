import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function useAOS() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      disable: 'mobile'
    })
    
    return () => {
      AOS.refresh()
    }
  }, [])
}
