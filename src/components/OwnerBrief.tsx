import { useState } from 'react'
import './OwnerBrief.css'

type BriefKey = 'today' | 'sales' | 'customer' | 'operations' | 'risk' | 'action'

type BriefMetric = {
  label: string
  value: string
  icon: string
  tone?: 'good' | 'risk'
}

type BriefItem = {
  key: BriefKey
  label: string
  title: string
  summary: string
  metrics: BriefMetric[]
  suggestedAction?: string
  checklist?: string[]
  tone?: 'warm' | 'green' | 'risk'
}

const BRIEFS: BriefItem[] = [
  {
    key: 'today',
    label: 'Today',
    title: "Today's Owner Brief",
    summary:
      'Dinner rush peaked around 8 PM. Chilli Chicken and Fish Chilli drove repeat orders. Two regular customers visited again.',
    metrics: [
      { label: 'Sales', value: '₹18,420', icon: '₹', tone: 'good' },
      { label: 'Orders', value: '42', icon: '42' },
      { label: 'Repeat customers', value: '6', icon: '↗', tone: 'good' },
      { label: 'Top item', value: 'Chilli Chicken', icon: '★' },
    ],
    suggestedAction: 'Prepare extra stock for evening rush tomorrow.',
    tone: 'green',
  },
  {
    key: 'sales',
    label: 'Sales Pattern',
    title: 'Sales Pattern Preview',
    summary: 'Sales were strongest between 7:30 PM and 9:00 PM. Table turnover was slower after 8:15 PM.',
    metrics: [
      { label: 'Peak hour', value: '8 PM', icon: '8' },
      { label: 'Avg bill', value: '₹438', icon: '₹' },
      { label: 'Best table zone', value: 'Indoor', icon: '●', tone: 'good' },
    ],
    suggestedAction: 'Add one cashier/waiter during the dinner rush.',
    tone: 'warm',
  },
  {
    key: 'customer',
    label: 'Customer Signal',
    title: 'Customer Signal',
    summary: 'Rohit and Priya both returned this week. Priya has crossed ₹4,000 total spend.',
    metrics: [
      { label: 'Returning customers', value: '6', icon: '↗', tone: 'good' },
      { label: 'High spenders', value: '2', icon: '₹', tone: 'good' },
      { label: 'Feedback pending', value: '3', icon: '!' },
    ],
    suggestedAction: 'Send feedback request to regular customers.',
    tone: 'green',
  },
  {
    key: 'operations',
    label: 'Staff / Operations',
    title: 'Staff / Operations',
    summary: 'KOT reprints were slightly higher today. Most reprints came during peak dinner time.',
    metrics: [
      { label: 'KOT reprints', value: '4', icon: 'KOT' },
      { label: 'Bill corrections', value: '1', icon: '!', tone: 'risk' },
      { label: 'Open orders', value: '0', icon: '0', tone: 'good' },
    ],
    suggestedAction: 'Review kitchen handoff during rush hour.',
    tone: 'warm',
  },
  {
    key: 'risk',
    label: 'Risk / Leakage',
    title: 'Risk / Leakage Hints',
    summary: 'One bill correction and one deleted item were recorded today. Nothing critical, but worth reviewing.',
    metrics: [
      { label: 'Corrections', value: '1', icon: '!', tone: 'risk' },
      { label: 'Deleted items', value: '1', icon: '!', tone: 'risk' },
      { label: 'Unpaid bills', value: '0', icon: '0', tone: 'good' },
    ],
    suggestedAction: 'Review correction log before closing.',
    tone: 'risk',
  },
  {
    key: 'action',
    label: 'Next Action',
    title: "Tomorrow's Action Plan",
    summary: "Tomorrow's plan should focus on dinner prep, regular customer follow-up, and kitchen coordination.",
    metrics: [
      { label: 'Prep focus', value: 'Top sellers', icon: '★' },
      { label: 'Follow-up', value: 'Regulars', icon: '↗' },
      { label: 'Coverage', value: '8 PM', icon: '8' },
    ],
    checklist: ['Prep top-selling items', 'Send feedback requests', 'Review correction log', 'Check staff coverage for 8 PM'],
    tone: 'green',
  },
]

const getBrief = (key: BriefKey) => BRIEFS.find((brief) => brief.key === key) ?? BRIEFS[0]

export default function OwnerBrief() {
  const [activeKey, setActiveKey] = useState<BriefKey>('today')
  const [reviewed, setReviewed] = useState(false)
  const [copied, setCopied] = useState(false)

  const activeBrief = getBrief(activeKey)

  const changeBrief = (key: BriefKey) => {
    setActiveKey(key)
    setReviewed(false)
    setCopied(false)
  }

  const copyBrief = async () => {
    const text = `${activeBrief.title}\n${activeBrief.summary}\nSuggested action: ${
      activeBrief.suggestedAction ?? activeBrief.checklist?.join(', ') ?? 'Review next actions.'
    }`

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      }
      setCopied(true)
    } catch {
      setCopied(true)
    }
  }

  return (
    <section id="owner-brief" className="owner-brief" aria-labelledby="owner-brief-title">
      <div className="container">
        <div className="owner-brief__header" data-reveal-stagger="80">
          <p className="owner-brief__eyebrow">AI-assisted owner brief</p>
          <h2 id="owner-brief-title">AI-assisted owner insights, without digging through reports.</h2>
          <p>FlowBook turns sales, customers, tables, and staff activity into simple owner-ready signals.</p>
        </div>

        <div className="owner-brief__layout">
          <aside className="owner-brief__selector" aria-label="Insight categories">
            <div className="owner-brief__selector-top">
              <span>Insight categories</span>
              <strong>Smart signals</strong>
            </div>
            <div className="owner-brief__chips" role="tablist" aria-label="Owner brief categories">
              {BRIEFS.map((brief) => (
                <button
                  key={brief.key}
                  className={`owner-brief__chip ${activeKey === brief.key ? 'owner-brief__chip--active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeKey === brief.key}
                  aria-controls="owner-brief-preview"
                  onClick={() => changeBrief(brief.key)}
                >
                  <span aria-hidden="true" />
                  {brief.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="owner-brief__main">
            <article
              id="owner-brief-preview"
              className={`owner-brief__card owner-brief__card--${activeBrief.tone ?? 'warm'} ${
                reviewed ? 'owner-brief__card--reviewed' : ''
              }`}
              key={activeBrief.key}
              role="tabpanel"
              aria-live="polite"
            >
              <div className="owner-brief__card-top">
                <div>
                  <span>Example insight preview</span>
                  <h3>{activeBrief.title}</h3>
                </div>
                <div className="owner-brief__status-stack">
                  <strong className="owner-brief__generated">
                    <i aria-hidden="true" />
                    Brief generated
                  </strong>
                  {reviewed && (
                    <strong className="owner-brief__reviewed">
                      <i aria-hidden="true">✓</i>
                      Reviewed
                    </strong>
                  )}
                </div>
              </div>

              <div className="owner-brief__body">
                <p className="owner-brief__summary">{activeBrief.summary}</p>

                {activeBrief.checklist ? (
                  <div className="owner-brief__checklist" aria-label="Next action checklist">
                    {activeBrief.checklist.map((item) => (
                      <div key={item}>
                        <span aria-hidden="true">✓</span>
                        <strong>{item}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="owner-brief__action">
                    <span>Suggested action</span>
                    <strong>{activeBrief.suggestedAction}</strong>
                  </div>
                )}
              </div>

              <div className="owner-brief__buttons">
                <button type="button" onClick={copyBrief}>
                  {copied ? 'Brief copied' : 'Copy brief'}
                </button>
                <button type="button" onClick={() => setReviewed(true)}>
                  {reviewed ? 'Marked reviewed' : 'Mark reviewed'}
                </button>
              </div>
            </article>

            <div className="owner-brief__metrics" aria-label={`${activeBrief.label} metrics`} key={`${activeBrief.key}-metrics`}>
              {activeBrief.metrics.map((metric) => (
                <div
                  key={`${activeBrief.key}-${metric.label}`}
                  className={`owner-brief__metric ${
                    metric.tone === 'good' ? 'owner-brief__metric--good' : metric.tone === 'risk' ? 'owner-brief__metric--risk' : ''
                  }`}
                >
                  <div className="owner-brief__metric-top">
                    <i aria-hidden="true">{metric.icon}</i>
                    <span>{metric.label}</span>
                  </div>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
