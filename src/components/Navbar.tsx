import { useEffect, useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Product', href: '#top' },
  { label: 'Smart CRM', href: '#smart-crm' },
  { label: 'AI Insights', href: '#owner-brief' },
  { label: 'Mobile Views', href: '#mobile-staff-views' },
  { label: 'Pricing', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <nav className="navbar__inner container" aria-label="Primary navigation">
          <a className="navbar__brand" href="#top" onClick={closeMenu} aria-label="FlowBook home">
            <img className="navbar__logo" src="/logo.png" alt="" width="40" height="40" />
            <span>FlowBook</span>
          </a>

          <div className="navbar__links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="navbar__cta button button--primary" href="#book-demo">
            Book a Demo
          </a>

          <button
            className="navbar__toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="mobile-menu" onClick={closeMenu}>
          <div className="mobile-menu__panel" onClick={(event) => event.stopPropagation()}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a className="button button--primary" href="#book-demo" onClick={closeMenu}>
              Book a Demo
            </a>
          </div>
        </div>
      )}
    </>
  )
}
