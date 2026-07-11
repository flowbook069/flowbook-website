import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './OrderStory.css'

type StoryStep = {
  label: string
  title: string
  copy: string
  meta: string
  visual: 'order' | 'kot' | 'bill' | 'customer' | 'insight'
}

const STEPS: StoryStep[] = [
  {
    label: '01',
    title: 'Take order',
    copy: 'Select table, add items, and customize the order.',
    meta: 'Table 4 · 2 items',
    visual: 'order',
  },
  {
    label: '02',
    title: 'Send KOT',
    copy: 'KOT reaches the kitchen clearly. Staff can reprint when needed.',
    meta: 'KOT #041 · Kitchen',
    visual: 'kot',
  },
  {
    label: '03',
    title: 'Bill and collect',
    copy: 'Generate bill, collect payment, and close the order.',
    meta: '₹1,020 · Cash',
    visual: 'bill',
  },
  {
    label: '04',
    title: 'Update customer history',
    copy: 'Customer history updates from real paid bills.',
    meta: 'Rohit profile updated',
    visual: 'customer',
  },
  {
    label: '05',
    title: 'Owner insight',
    copy: 'Owner gets simple insights without digging through reports.',
    meta: 'Owner brief generated',
    visual: 'insight',
  },
]

function OrderVisual() {
  return (
    <div className="story-card story-card--order">
      <div className="story-card__top">
        <span>Floor screen</span>
        <strong>Table 4 selected</strong>
      </div>
      <div className="story-floor">
        <div>T1</div>
        <div>T2</div>
        <div className="is-active">T4</div>
        <div>T7</div>
      </div>
      <div className="story-list">
        <div><span>Chilli Chicken</span><strong>x1</strong></div>
        <div><span>Fish Chilli</span><strong>x1</strong></div>
        <div><span>Note</span><strong>Medium spicy</strong></div>
      </div>
    </div>
  )
}

function KotVisual() {
  return (
    <div className="story-kot-wrap">
      <div className="story-card story-card--kitchen">
        <div className="story-card__top">
          <span>Kitchen screen</span>
          <strong>Live tickets</strong>
        </div>
        <div className="story-ticket-list">
          <div>KOT #039 · Table 2</div>
          <div className="is-live">KOT #041 · Table 4</div>
          <div>KOT #042 · Takeaway</div>
        </div>
      </div>
      <div className="story-kot-card">
        <div className="story-kot-card__pin" aria-hidden="true" />
        <span>Kitchen Order Ticket</span>
        <strong>Table 4</strong>
        <p>Chilli Chicken x1 · Fish Chilli x1</p>
        <button type="button">Reprint KOT</button>
      </div>
    </div>
  )
}

function BillVisual() {
  return (
    <div className="story-card story-card--bill">
      <div className="story-card__top">
        <span>Bill</span>
        <strong>FLO/2026-27/000041</strong>
      </div>
      <div className="story-bill-lines">
        <div><span>Chilli Chicken</span><strong>₹560</strong></div>
        <div><span>Fish Chilli</span><strong>₹410</strong></div>
        <div><span>Taxes</span><strong>₹50</strong></div>
      </div>
      <div className="story-bill-total">
        <span>Total</span>
        <strong>₹1,020</strong>
      </div>
      <div className="story-payment">Payment mode: Cash</div>
      <div className="story-close-state">
        <span>Paid order closed</span>
        <strong>Customer history ready</strong>
      </div>
    </div>
  )
}

function CustomerVisual() {
  return (
    <div className="story-card story-card--customer">
      <div className="story-card__top">
        <span>Customer profile</span>
        <strong>Updated from paid bill</strong>
      </div>
      <div className="story-profile">
        <div className="story-avatar">R</div>
        <div>
          <h3>Rohit</h3>
          <p>Recent order: Chilli Chicken + Fish Chilli</p>
        </div>
      </div>
      <div className="story-stats">
        <div><strong>3</strong><span>Visits</span></div>
        <div><strong>₹1,850</strong><span>Spend</span></div>
        <div><strong>Regular</strong><span>Tag</span></div>
      </div>
      <div className="story-profile-note">Updated only after paid bill</div>
    </div>
  )
}

function InsightVisual() {
  return (
    <div className="story-card story-card--insight">
      <div className="story-card__top">
        <span>Owner brief</span>
        <strong>Simple insight</strong>
      </div>
      <div className="story-insight">
        <span>AI-assisted insight</span>
        <h3>Chilli Chicken sold best today. 2 repeat customers visited.</h3>
        <p>Suggested action: ask repeat customers for feedback after dinner service.</p>
      </div>
      <div className="story-insight-steps">
        <span>Order</span>
        <span>KOT</span>
        <span>Bill</span>
        <span>Customer</span>
      </div>
    </div>
  )
}

function StepVisual({ visual }: { visual: StoryStep['visual'] }) {
  if (visual === 'order') return <OrderVisual />
  if (visual === 'kot') return <KotVisual />
  if (visual === 'bill') return <BillVisual />
  if (visual === 'customer') return <CustomerVisual />
  return <InsightVisual />
}

const DESKTOP_MIN = 981

export default function OrderStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const clickLockRef = useRef(false)
  const clickTimerRef = useRef(0)
  const active = STEPS[activeIndex]

  const handleProgress = (progress: number) => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < DESKTOP_MIN) return
    if (clickLockRef.current) return
    const idx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length * 0.999))
    setActiveIndex(idx)
  }

  useScrollProgress(sectionRef, '--scroll-progress', handleProgress)

  useEffect(() => {
    return () => clearTimeout(clickTimerRef.current)
  }, [])

  const selectStep = (index: number) => {
    clickLockRef.current = true
    clearTimeout(clickTimerRef.current)
    clickTimerRef.current = window.setTimeout(() => {
      clickLockRef.current = false
    }, 1200)
    setActiveIndex(index)
  }

  const onStepKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      selectStep(Math.min(activeIndex + 1, STEPS.length - 1))
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      selectStep(Math.max(activeIndex - 1, 0))
    }
  }

  return (
    <section id="order-story" className="story" ref={sectionRef}>
      <div className="container">
        <div className="story__header" data-reveal-stagger="80">
          <p className="story__eyebrow">Order to insight</p>
          <h2>From order to insight — FlowBook keeps every step connected.</h2>
          <p>Every order moves through billing, kitchen, payment, customer history, and owner insight without getting lost.</p>
        </div>

        <div className="story__layout">
          <div className="story__rail" role="tablist" aria-label="Order journey steps" onKeyDown={onStepKeyDown}>
            <div className="story__progress" aria-hidden="true">
              <span className={`story__progress-fill story__progress-fill--${activeIndex + 1}`} />
            </div>
            <div className="story__progress-text">Step {activeIndex + 1} of {STEPS.length}</div>
            <div className="story__journey">
              <div className="story__flow" aria-hidden="true">
                <span className={`story__flow-fill story__flow-fill--${activeIndex + 1}`} />
                <span className={`story__flow-marker story__flow-marker--${activeIndex + 1}`} />
              </div>
              <div className="story__steps">
                {STEPS.map((step, index) => (
                  <div className="story__chapter" key={step.title}>
                    <button
                      className={`story__step ${activeIndex === index ? 'story__step--active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={activeIndex === index}
                      aria-controls="story-visual"
                      onClick={() => selectStep(index)}
                    >
                      <span>{step.label}</span>
                      <div className="story__step-copy">
                        <strong>{step.title}</strong>
                        <small>{step.copy}</small>
                        <em>{step.meta}</em>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="story-visual" className="story__visual" role="tabpanel" aria-live="polite">
            <div className="story__visual-copy">
              <span>{active.label}</span>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
            </div>
            <div className="story__visual-stage">
              {STEPS.map((step, index) => (
                <div
                  key={step.visual}
                  className={`story__layer${
                    index === activeIndex ? ' story__layer--active' :
                    index < activeIndex ? ' story__layer--past' : ''
                  }`}
                >
                  <StepVisual visual={step.visual} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
