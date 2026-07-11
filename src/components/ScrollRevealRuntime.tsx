import { useEffect } from 'react'

export default function ScrollRevealRuntime() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      document.documentElement.classList.add('reveal-reduced')
      return undefined
    }

    const targets = new Set<HTMLElement>()

    document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
      const step = Number(group.dataset.revealStagger || 80)

      Array.from(group.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return

        child.dataset.reveal = child.dataset.reveal || 'stagger'
        child.style.setProperty('--reveal-delay', `${index * step}ms`)
        targets.add(child)
      })
    })

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((target) => {
      const delay = target.dataset.revealDelay

      if (delay) target.style.setProperty('--reveal-delay', `${delay}ms`)
      targets.add(target)
    })

    document.documentElement.classList.add('reveal-ready')
    document.documentElement.classList.add('motion-enhanced')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 },
    )

    targets.forEach((target) => observer.observe(target))

    const fallback = setTimeout(() => {
      targets.forEach((target) => {
        if (!target.classList.contains('is-revealed')) {
          target.classList.add('is-revealed')
        }
      })
    }, 1500)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
      document.documentElement.classList.remove('reveal-ready')
      document.documentElement.classList.remove('motion-enhanced')
    }
  }, [])

  return null
}
