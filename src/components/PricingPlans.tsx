import { useState } from 'react'
import './PricingPlans.css'

type PlanKey = 'basics' | 'pro' | 'plus'
type Billing = 'annual' | 'monthly'

type Plan = {
  key: PlanKey
  name: string
  positioning: string
  bestFor: string
  devices: string
  annual: number
  monthly: number
  cta: string
  badge?: string
  includes: string[]
  smartLabel: string
  smartItems: string[]
  notIncluded?: string[]
}

type QuizState = {
  devices: 'one' | 'two' | 'four'
  customer: 'basic' | 'smart'
  ai: 'standard' | 'ai' | 'advanced'
  control: 'no' | 'yes'
}

type CellValue = true | false | string

type ComparisonGroup = {
  name: string
  rows: { feature: string; basics: CellValue; pro: CellValue; plus: CellValue }[]
}

const PLANS: Plan[] = [
  {
    key: 'basics',
    name: 'FlowBook Basics',
    positioning: 'Run your restaurant.',
    bestFor: 'Small restaurants and cafes that need reliable core operations.',
    devices: '1 device',
    annual: 8500,
    monthly: 799,
    cta: 'Choose Basics',
    includes: [
      'Billing and checkout',
      'KOT / kitchen workflow',
      'Table and floor management',
      'Menu management',
      'Cash / UPI payment marking',
      'Offline-first billing',
      'Core staff roles',
      'Sales and order reports',
      'Day closing',
      'Basic customer records',
      'Basic paid-order history',
    ],
    smartLabel: 'OWNER BRIEF',
    smartItems: [
      'Standard data-driven Owner Brief',
      'Not AI-assisted',
    ],
    notIncluded: ['Smart CRM & tags', 'AI-assisted Owner Brief', 'Smart food tags', 'Mobile role workflows'],
  },
  {
    key: 'pro',
    name: 'FlowBook Pro',
    positioning: 'Understand your restaurant.',
    badge: 'Most Popular',
    bestFor: 'Growing restaurants that need staff workflows, CRM, and smarter insights.',
    devices: 'Up to 2 devices',
    annual: 10499,
    monthly: 1099,
    cta: 'Choose Pro',
    includes: [
      'Everything in Basics',
      'Multi-device role workflows',
      'Mobile cashier / waiter / kitchen views',
      'Full customer order history',
      'Smart CRM',
      'Customer Behaviour Tracking',
      'Smart customer tags',
      'Advanced Sales & Orders',
    ],
    smartLabel: 'AI & SMART INSIGHTS',
    smartItems: [
      'AI-assisted Owner Brief',
      'Smart food performance tags',
      'AI food-tag review every 14 days',
      'Enhanced operational insights',
    ],
  },
  {
    key: 'plus',
    name: 'FlowBook Pro Plus',
    positioning: 'Control what happens next.',
    bestFor: 'Serious operators who need full control, advanced AI, and deeper analytics.',
    devices: 'Up to 4 devices',
    annual: 14000,
    monthly: 1399,
    cta: 'Choose Pro Plus',
    includes: [
      'Everything in Pro',
      'Advanced customer behaviour insights',
      'Advanced customer segments',
      'Inventory and costing',
      'Advanced audit and correction review',
      'Risk and leakage signals',
      'Staff activity visibility',
      'Deeper operational analytics',
    ],
    smartLabel: 'ADVANCED AI',
    smartItems: [
      'Advanced AI-assisted Owner Brief',
      'Smart menu tags that adapt to real sales behaviour',
      '14-day AI review cycle',
    ],
  },
]

const COMPARISON: ComparisonGroup[] = [
  {
    name: 'Core Operations',
    rows: [
      { feature: 'Device access', basics: '1 device', pro: 'Up to 2', plus: 'Up to 4' },
      { feature: 'Billing & checkout', basics: true, pro: true, plus: true },
      { feature: 'KOT / kitchen workflow', basics: true, pro: true, plus: true },
      { feature: 'Table & floor management', basics: true, pro: true, plus: true },
      { feature: 'Menu management', basics: true, pro: true, plus: true },
      { feature: 'Offline-first billing', basics: true, pro: true, plus: true },
      { feature: 'Sales & order reports', basics: true, pro: true, plus: true },
      { feature: 'Day closing', basics: true, pro: true, plus: true },
    ],
  },
  {
    name: 'Customer Intelligence',
    rows: [
      { feature: 'Basic customer records', basics: true, pro: true, plus: true },
      { feature: 'Paid-order customer history', basics: 'Basic', pro: 'Full', plus: 'Full' },
      { feature: 'Smart CRM', basics: false, pro: true, plus: true },
      { feature: 'Customer Behaviour Tracking', basics: false, pro: true, plus: true },
      { feature: 'Smart customer tags', basics: false, pro: true, plus: true },
      { feature: 'Advanced customer segments', basics: false, pro: false, plus: true },
    ],
  },
  {
    name: 'AI & Smart Insights',
    rows: [
      { feature: 'Owner Brief', basics: 'Standard', pro: 'AI-assisted', plus: 'Advanced AI' },
      { feature: 'AI-assisted Owner Brief', basics: false, pro: true, plus: true },
      { feature: 'Smart food performance tags', basics: false, pro: true, plus: true },
      { feature: '14-day AI food-tag review', basics: false, pro: true, plus: true },
      { feature: 'Advanced owner insights', basics: false, pro: false, plus: true },
    ],
  },
  {
    name: 'Control & Scale',
    rows: [
      { feature: 'Mobile role workflows', basics: false, pro: true, plus: true },
      { feature: 'Inventory & costing', basics: false, pro: false, plus: true },
      { feature: 'Audit & correction visibility', basics: false, pro: false, plus: true },
      { feature: 'Risk / leakage signals', basics: false, pro: false, plus: true },
      { feature: 'Staff activity visibility', basics: false, pro: false, plus: true },
    ],
  },
]

function formatPrice(amount: number, billing: Billing): string {
  const formatted = amount.toLocaleString('en-IN')
  return billing === 'annual' ? `₹${formatted}/year` : `₹${formatted}/month`
}

function renderCell(value: CellValue) {
  if (value === true) return <span className="pricing__cell-check" aria-label="Included">✓</span>
  if (value === false) return <span className="pricing__cell-dash" aria-label="Not included">—</span>
  return <span>{value}</span>
}

function getQuizResult(quiz: QuizState): { plan: PlanKey; reason: string } {
  if (quiz.devices === 'four' || quiz.control === 'yes' || quiz.ai === 'advanced') {
    return {
      plan: 'plus',
      reason: '4 devices, inventory, audit controls, or advanced AI insights fit Pro Plus best.',
    }
  }
  if (quiz.devices === 'two' || quiz.customer === 'smart' || quiz.ai === 'ai') {
    return {
      plan: 'pro',
      reason: 'Multi-device workflows, Smart CRM, or AI-assisted Owner Brief need Pro.',
    }
  }
  return {
    plan: 'basics',
    reason: 'Single-device billing, KOT, tables, and standard reports fit Basics.',
  }
}

const getPlanName = (key: PlanKey) => PLANS.find((plan) => plan.key === key)?.name ?? 'FlowBook Pro'

export default function PricingPlans() {
  const [billing, setBilling] = useState<Billing>('annual')
  const [highlightedPlan, setHighlightedPlan] = useState<PlanKey>('pro')
  const [openGroups, setOpenGroups] = useState<string[]>(['Core Operations'])
  const [quiz, setQuiz] = useState<QuizState>({
    devices: 'one',
    customer: 'basic',
    ai: 'standard',
    control: 'no',
  })
  const quizResult = getQuizResult(quiz)

  const toggleGroup = (name: string) => {
    setOpenGroups(prev =>
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    )
  }

  return (
    <section id="plans" className="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="pricing__header" data-reveal-stagger="80">
          <p className="pricing__eyebrow">Pricing</p>
          <h2 id="pricing-title">Simple plans. Clear differences.</h2>
          <p>
            Choose monthly flexibility or annual billing. Every plan includes FlowBook's core restaurant operating
            experience — upgrade when you need more devices, customer intelligence and advanced AI-assisted control.
          </p>
        </div>

        <div className="pricing__toggle" role="radiogroup" aria-label="Billing period">
          <button
            type="button"
            role="radio"
            aria-checked={billing === 'annual'}
            className={`pricing__toggle-btn${billing === 'annual' ? ' pricing__toggle-btn--active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={billing === 'monthly'}
            className={`pricing__toggle-btn${billing === 'monthly' ? ' pricing__toggle-btn--active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="pricing__cards" aria-label="FlowBook pricing plans">
          {PLANS.map((plan) => (
            <article
              key={plan.key}
              className={`pricing__card ${highlightedPlan === plan.key ? 'pricing__card--active' : ''} ${
                plan.key === 'pro' ? 'pricing__card--popular' : ''
              }`}
            >
              {plan.badge && <span className="pricing__badge">{plan.badge}</span>}
              <div className="pricing__card-top">
                <h3>{plan.name}</h3>
                <div className="pricing__positioning">{plan.positioning}</div>
                <p>{plan.bestFor}</p>
              </div>

              <div className="pricing__price">
                {formatPrice(billing === 'annual' ? plan.annual : plan.monthly, billing)}
              </div>
              <div className="pricing__devices">{plan.devices}</div>

              <a className="pricing__cta" href="mailto:flowbook069@gmail.com">
                {plan.cta}
              </a>

              <div className="pricing__list">
                <span>Includes</span>
                {plan.includes.map((item) => (
                  <div key={`${plan.key}-${item}`}>
                    <strong aria-hidden="true">✓</strong>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="pricing__smart">
                <span>{plan.smartLabel}</span>
                {plan.smartItems.map((item) => (
                  <p key={`${plan.key}-${item}`}>{item}</p>
                ))}
              </div>

              {plan.notIncluded && (
                <div className="pricing__not">
                  <span>Not included</span>
                  {plan.notIncluded.map((item) => (
                    <p key={`${plan.key}-${item}`}>{item}</p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="pricing__note">
          Device access means the maximum number of authorized devices that can actively use FlowBook for the restaurant under the selected plan.
        </p>

        <div className="pricing__comparison" aria-labelledby="comparison-title" data-reveal data-reveal-delay="180">
          <div className="pricing__section-title">
            <span>Compare plans</span>
            <h3 id="comparison-title">What each plan includes</h3>
          </div>

          <div className="pricing__grouped-comparison">
            {COMPARISON.map((group) => {
              const isOpen = openGroups.includes(group.name)
              return (
                <div key={group.name} className={`pricing__comp-group${isOpen ? ' pricing__comp-group--open' : ''}`}>
                  <button
                    type="button"
                    className="pricing__comp-trigger"
                    onClick={() => toggleGroup(group.name)}
                    aria-expanded={isOpen}
                  >
                    <span>{group.name}</span>
                    <span className="pricing__comp-chevron">{isOpen ? '⌃' : '⌄'}</span>
                  </button>

                  {isOpen && (
                    <>
                      <div className="pricing__table-wrap">
                        <table className="pricing__table">
                          <thead>
                            <tr>
                              <th scope="col">Feature</th>
                              <th scope="col">Basics</th>
                              <th scope="col">Pro</th>
                              <th scope="col">Pro Plus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.rows.map((row) => (
                              <tr key={row.feature}>
                                <th scope="row">{row.feature}</th>
                                <td>{renderCell(row.basics)}</td>
                                <td>{renderCell(row.pro)}</td>
                                <td>{renderCell(row.plus)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="pricing__comparison-cards" aria-label={`${group.name} mobile comparison`}>
                        {group.rows.map((row) => (
                          <div key={`m-${row.feature}`} className="pricing__comparison-card">
                            <strong>{row.feature}</strong>
                            <span>Basics: {row.basics === true ? '✓' : row.basics === false ? '—' : row.basics}</span>
                            <span>Pro: {row.pro === true ? '✓' : row.pro === false ? '—' : row.pro}</span>
                            <span>Pro Plus: {row.plus === true ? '✓' : row.plus === false ? '—' : row.plus}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pricing__smart-note">
            <strong>Smart food performance tags</strong> — FlowBook reviews actual item sales behaviour every 14 days
            and updates relevant menu performance tags as patterns change. Examples include Hot Selling, Fast Moving,
            Slow Moving, Trending, High Repeat, and Needs Attention. Available on Pro and Pro Plus.
          </div>
        </div>

        <div className="pricing__quiz" aria-labelledby="quiz-title">
          <div className="pricing__quiz-copy">
            <span>Plan selector</span>
            <h3 id="quiz-title">Find the right starting plan.</h3>
            <p>Answer four questions. Result updates instantly.</p>
            <div className="pricing__result" aria-live="polite">
              <span>Recommended plan</span>
              <h4>{getPlanName(quizResult.plan)}</h4>
              <p>{quizResult.reason}</p>
            </div>
          </div>

          <div className="pricing__quiz-questions">
            <div className="pricing__quiz-q">
              <h4>1. How many devices?</h4>
              <div className="pricing__quiz-options">
                <button type="button" className={quiz.devices === 'one' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, devices: 'one' })}>1 device</button>
                <button type="button" className={quiz.devices === 'two' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, devices: 'two' })}>Up to 2</button>
                <button type="button" className={quiz.devices === 'four' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, devices: 'four' })}>Up to 4</button>
              </div>
            </div>
            <div className="pricing__quiz-q">
              <h4>2. Customer tracking needs?</h4>
              <div className="pricing__quiz-options">
                <button type="button" className={quiz.customer === 'basic' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, customer: 'basic' })}>Basic records</button>
                <button type="button" className={quiz.customer === 'smart' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, customer: 'smart' })}>Smart CRM & tags</button>
              </div>
            </div>
            <div className="pricing__quiz-q">
              <h4>3. Owner Brief preference?</h4>
              <div className="pricing__quiz-options">
                <button type="button" className={quiz.ai === 'standard' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, ai: 'standard' })}>Standard</button>
                <button type="button" className={quiz.ai === 'ai' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, ai: 'ai' })}>AI-assisted</button>
                <button type="button" className={quiz.ai === 'advanced' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, ai: 'advanced' })}>Advanced AI</button>
              </div>
            </div>
            <div className="pricing__quiz-q">
              <h4>4. Need inventory, audit, or risk controls?</h4>
              <div className="pricing__quiz-options">
                <button type="button" className={quiz.control === 'no' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, control: 'no' })}>Not now</button>
                <button type="button" className={quiz.control === 'yes' ? 'pricing__quiz-option--matched' : ''} onClick={() => setQuiz({ ...quiz, control: 'yes' })}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
