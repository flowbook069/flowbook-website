import './FinalCTA.css'

const CTA_ITEMS = ['Billing ready', 'KOT sent', 'Customer remembered', 'Owner brief generated']

export default function FinalCTA() {
  return (
    <section id="book-demo" className="final-cta" aria-labelledby="final-cta-title">
      <div className="container final-cta__inner">
        <div className="final-cta__copy" data-reveal-stagger="85">
          <p className="final-cta__eyebrow">Ready when you are</p>
          <h2 id="final-cta-title">Ready to bring control back to your restaurant?</h2>
          <p>
            Start with clean billing today. Grow into smart CRM, mobile staff views, and AI-assisted owner insights when
            you are ready.
          </p>
          <div className="final-cta__actions">
            <a className="button button--primary" href="#plans">
              View Plans
            </a>
            <a className="button button--outline" href="mailto:flowbook069@gmail.com">
              Email Us
            </a>
            <a className="button button--outline" href="tel:+919263776955">
              Call 92637 76955
            </a>
          </div>
          <strong className="final-cta__microcopy">Need help choosing a plan? Talk to the FlowBook team.</strong>
        </div>

        <div className="final-cta__card" aria-label="FlowBook readiness preview" data-reveal="right" data-reveal-delay="140">
          <div className="final-cta__card-top">
            <span>FlowBook status</span>
            <strong>Ready</strong>
          </div>
          <div className="final-cta__status-list" data-reveal-stagger="65">
            {CTA_ITEMS.map((item) => (
              <div key={item}>
                <span aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
