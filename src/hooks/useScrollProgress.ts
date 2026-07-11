import { useEffect, useRef, RefObject } from 'react'

export function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  cssVar = '--scroll-progress',
  onProgress?: (progress: number) => void
): void {
  const frameRef = useRef(0)
  const cbRef = useRef(onProgress)
  cbRef.current = onProgress

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty(cssVar, '1')
      return
    }

    const update = () => {
      frameRef.current = 0
      const rect = el.getBoundingClientRect()
      const travel = Math.max(el.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
      el.style.setProperty(cssVar, progress.toFixed(4))
      cbRef.current?.(progress)
    }

    const onScroll = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef, cssVar])
}
