import './Footer.css'

const PRODUCT_LINKS = [
  { label: 'Product', href: '#top' },
  { label: 'Smart CRM', href: '#smart-crm' },
  { label: 'AI Insights', href: '#owner-brief' },
  { label: 'Mobile Views', href: '#mobile-staff-views' },
  { label: 'Pricing', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
]

const PLAN_LINKS = [
  { label: 'Basics', href: '#plans' },
  { label: 'Pro', href: '#plans' },
  { label: 'Pro Plus', href: '#plans' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__intro" data-reveal>
          <div className="footer__brand">
            <img className="footer__logo" src="/logo.png" alt="" width="46" height="46" />
            <span>FlowBook</span>
          </div>
          <p>Smart restaurant POS for billing, KOT, tables, staff, customers, reports, and owner insights.</p>
        </div>

        <div className="footer__links" aria-label="Footer navigation" data-reveal-stagger="80">
          <div>
            <h2>Quick links</h2>
            {PRODUCT_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h2>Plans</h2>
            {PLAN_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <h2>Contact</h2>
            <a href="mailto:flowbook069@gmail.com">Email Us</a>
            <a href="tel:+919263776955">Call 92637 76955</a>
          </div>
        </div>
      </div>
      <div className="container footer__bottom" data-reveal data-reveal-delay="120">
        <span>© 2026 FlowBook. All rights reserved.</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}
