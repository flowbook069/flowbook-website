import { useState } from 'react'
import './FAQ.css'

type FAQItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is FlowBook only for billing?',
    answer:
      'No. Billing and KOT are the base. FlowBook also connects tables, staff roles, customers, order history, reports, mobile role views, and AI-assisted owner insights.',
  },
  {
    question: 'Does customer history update automatically?',
    answer:
      'Yes. Customer history is linked to paid orders, so visits, spend, and recent orders come from real bills instead of manual counters.',
  },
  {
    question: 'Can staff use mobile screens?',
    answer:
      'FlowBook includes mobile-friendly role views for cashier, waiter, kitchen, manager, and owner workflows. Each role gets a focused screen for the work they need to do.',
  },
  {
    question: 'What does AI-assisted mean here?',
    answer:
      'FlowBook can surface suggested tags, owner brief signals, sales patterns, customer signals, and risk hints. These are assistive insights, not automatic business decisions.',
  },
  {
    question: 'Does FlowBook work if internet is slow?',
    answer:
      'FlowBook is designed around offline-first billing and sync, so restaurant work can continue even when connectivity is unreliable.',
  },
  {
    question: 'Is FlowBook suitable for multiple outlets?',
    answer:
      'FlowBook Pro Plus is intended for operators who need more visibility, multi-outlet control, advanced owner dashboards, and stronger review workflows.',
  },
  {
    question: 'Is pricing fixed?',
    answer:
      'Final pricing may vary by outlet count, setup needs, and required modules. The website currently shows plan structure, not final public pricing.',
  },
  {
    question: 'What plan should I start with?',
    answer:
      'Basics is good for clean billing and KOT. Pro is best for most growing restaurants. Pro Plus is for serious operators who need owner visibility, risk hints, and multi-outlet control.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="faq__header" data-reveal-stagger="80">
          <p className="faq__eyebrow">FAQ</p>
          <h2 id="faq-title">Questions restaurant owners usually ask.</h2>
          <p>Clear answers before you decide whether FlowBook fits your restaurant.</p>
        </div>

        <div className="faq__accordion">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index
            const panelId = `faq-panel-${index}`

            return (
              <article key={item.question} className={`faq__item ${open ? 'faq__item--open' : ''}`}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <strong aria-hidden="true">{open ? '−' : '+'}</strong>
                </button>
                <div id={panelId} className="faq__panel" hidden={!open}>
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
