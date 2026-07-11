import { useRef, useState } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './Hero.css'

type Feature = {
  label: string
  benefit: string
  desktopTitle: string
  desktopKicker: string
  desktopItems: string[]
  desktopSide: string[]
  desktopAction: string
  mobileTitle: string
  mobileStats: { label: string; value: string }[]
  mobileDetail: string
  floating: { label: string; value: string; tone: 'accent' | 'success' | 'dark' }[]
}

const FEATURES: Feature[] = [
  {
    label: 'Billing',
    benefit: 'Create bills quickly with menu items, cart totals, customer link, and payment closure in one flow.',
    desktopTitle: 'Active bill - Table 4',
    desktopKicker: 'Cashier workspace',
    desktopItems: ['Chilli Chicken x1', 'Fish Chilli x1', 'Customer: Rohit', 'Payment: Cash'],
    desktopSide: ['Subtotal Rs 589', 'Tax Rs 29', 'Total Rs 618'],
    desktopAction: 'Close paid order',
    mobileTitle: 'Cashier',
    mobileStats: [
      { label: 'Items', value: '2' },
      { label: 'Total', value: 'Rs 618' },
      { label: 'Mode', value: 'Cash' },
    ],
    mobileDetail: 'Bill, collect payment, and close order without waiting on another screen.',
    floating: [
      { label: "Today's sales", value: '₹18,420', tone: 'success' },
      { label: 'Order', value: 'Paid order closed', tone: 'dark' },
      { label: 'Kitchen', value: 'KOT sent: Table 4', tone: 'accent' },
    ],
  },
  {
    label: 'KOT',
    benefit: 'Send clear kitchen tickets from the order screen and reprint when service gets busy.',
    desktopTitle: 'Kitchen order ticket',
    desktopKicker: 'Table 4',
    desktopItems: ['Chilli Chicken - spicy', 'Fish Chilli - no onion', '2 items queued', 'Reprint available'],
    desktopSide: ['KOT #041', 'Sent 8:14 PM', 'Kitchen: Active'],
    desktopAction: 'Send KOT',
    mobileTitle: 'Kitchen',
    mobileStats: [
      { label: 'Pending', value: '3' },
      { label: 'Ready', value: '6' },
      { label: 'Table', value: 'T4' },
    ],
    mobileDetail: 'Tickets stay readable for kitchen staff without crowding billing counter.',
    floating: [
      { label: 'Kitchen', value: 'KOT sent: Table 4', tone: 'accent' },
      { label: 'Status', value: 'Ticket visible in kitchen', tone: 'success' },
      { label: 'Action', value: 'Reprint ready', tone: 'dark' },
    ],
  },
  {
    label: 'Tables',
    benefit: 'Know which tables are open, active, billed, or paid before staff ask twice.',
    desktopTitle: 'Floor view',
    desktopKicker: 'Dining area',
    desktopItems: ['T4 - billed', 'T7 - active', 'T9 - open', 'T12 - paid'],
    desktopSide: ['Open 8', 'Active 3', 'Billed 1'],
    desktopAction: 'Open table',
    mobileTitle: 'Waiter',
    mobileStats: [
      { label: 'Open', value: '8' },
      { label: 'Active', value: '3' },
      { label: 'Billed', value: '1' },
    ],
    mobileDetail: 'Open tables, add items, and send KOT from a compact staff screen.',
    floating: [
      { label: 'Table', value: 'T4 ready for payment', tone: 'accent' },
      { label: 'Floor', value: '8 tables open', tone: 'success' },
      { label: 'Order', value: 'Paid order closed', tone: 'dark' },
    ],
  },
  {
    label: 'Smart CRM',
    benefit: 'Customer history comes from paid orders, so staff see visits, spend, recent items, and useful tags.',
    desktopTitle: 'Customer profile',
    desktopKicker: 'Rohit',
    desktopItems: ['3 visits', '₹1,850 spend', 'Recent order: Chilli Chicken + Fish Chilli', 'Tags: Regular, High spender'],
    desktopSide: ['Phone 234567321', 'Marketing opted in', 'Last visit this week'],
    desktopAction: 'View profile',
    mobileTitle: 'Customer',
    mobileStats: [
      { label: 'Visits', value: '3' },
      { label: 'Spend', value: '₹1,850' },
      { label: 'Tag', value: 'Regular' },
    ],
    mobileDetail: 'Rohit: recent order Chilli Chicken + Fish Chilli.',
    floating: [
      { label: 'Customer tagged', value: 'Regular', tone: 'accent' },
      { label: 'Profile', value: '₹1,850 spend', tone: 'success' },
      { label: 'Recent order', value: 'Chilli Chicken + Fish Chilli', tone: 'dark' },
    ],
  },
  {
    label: 'AI Tags',
    benefit: 'Suggested tags help owners and staff notice repeat behavior without inventing customer counters.',
    desktopTitle: 'Suggested tag',
    desktopKicker: 'High-value customer',
    desktopItems: ['Customer: Rohit', 'Reason: repeat visits and spend', 'Confidence: review before apply', 'Suggested action: ask for feedback'],
    desktopSide: ['Repeat visits', 'High spend', 'Marketing OK'],
    desktopAction: 'Apply tag',
    mobileTitle: 'AI Tags',
    mobileStats: [
      { label: 'Suggest', value: '1' },
      { label: 'Reason', value: 'Spend' },
      { label: 'Review', value: 'Yes' },
    ],
    mobileDetail: 'Suggested tag: High-value customer. Reason: repeat visits and spend.',
    floating: [
      { label: 'Suggested tag', value: 'High-value customer', tone: 'accent' },
      { label: 'Reason', value: 'Repeat visits and spend', tone: 'dark' },
      { label: 'Customer tagged', value: 'Regular', tone: 'success' },
    ],
  },
  {
    label: 'Reports',
    benefit: 'Owners get sales, paid orders, corrections, and item patterns without digging through every ticket.',
    desktopTitle: 'Sales report',
    desktopKicker: 'Today',
    desktopItems: ['Sales: ₹18,420', 'Top item: Chilli Chicken', 'Paid bills: 42', 'Corrections: 1'],
    desktopSide: ['Cash', 'UPI', 'Cards'],
    desktopAction: 'Open report',
    mobileTitle: 'Owner',
    mobileStats: [
      { label: 'Sales', value: '₹18k' },
      { label: 'Bills', value: '42' },
      { label: 'Top', value: 'Chilli' },
    ],
    mobileDetail: 'Owner view keeps daily activity readable at a glance.',
    floating: [
      { label: "Today's sales", value: '₹18,420', tone: 'success' },
      { label: 'Top item', value: 'Chilli Chicken', tone: 'accent' },
      { label: 'Correction', value: '1 paid bill correction', tone: 'dark' },
    ],
  },
  {
    label: 'Mobile Views',
    benefit: 'Each role gets a screen built for fast taps, not tiny desktop pages squeezed onto a phone.',
    desktopTitle: 'Role screens',
    desktopKicker: 'Staff workflow',
    desktopItems: ['Cashier billing', 'Waiter table order', 'Kitchen tickets', 'Owner overview'],
    desktopSide: ['Owner', 'Cashier', 'Kitchen'],
    desktopAction: 'Switch role',
    mobileTitle: 'Staff view',
    mobileStats: [
      { label: 'Role', value: 'Waiter' },
      { label: 'Tap', value: 'Fast' },
      { label: 'KOT', value: 'Send' },
    ],
    mobileDetail: 'Mobile staff views keep rush-hour actions focused.',
    floating: [
      { label: 'Mobile', value: 'Waiter view active', tone: 'accent' },
      { label: 'Kitchen', value: 'KOT sent: Table 4', tone: 'dark' },
      { label: 'Order', value: 'Paid order closed', tone: 'success' },
    ],
  },
  {
    label: 'Sync',
    benefit: 'Devices update in the background so billing stays fast during live service.',
    desktopTitle: 'Sync health',
    desktopKicker: 'Multi-device',
    desktopItems: ['Devices updated', 'No billing slowdown', 'Last push complete', 'Offline queue clear'],
    desktopSide: ['Cashier synced', 'Kitchen synced', 'Owner synced'],
    desktopAction: 'View sync',
    mobileTitle: 'Sync',
    mobileStats: [
      { label: 'Queue', value: '0' },
      { label: 'Status', value: 'Done' },
      { label: 'Speed', value: 'Live' },
    ],
    mobileDetail: 'Devices updated. No billing slowdown.',
    floating: [
      { label: 'Sync', value: 'Sync complete', tone: 'success' },
      { label: 'Devices', value: 'Devices updated', tone: 'accent' },
      { label: 'Billing', value: 'No billing slowdown', tone: 'dark' },
    ],
  },
]

const THEATRE_FLOATS = [
  { label: 'Kitchen', value: 'KOT sent', tone: 'accent' },
  { label: 'Billing', value: 'Bill closed', tone: 'dark' },
  { label: 'Customer', value: 'Customer remembered', tone: 'success' },
  { label: 'Owner', value: 'Owner brief generated', tone: 'accent' },
  { label: 'Sync', value: 'Sync complete', tone: 'success' },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const active = FEATURES[activeIndex]

  useScrollProgress(sectionRef)

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <div className="hero__sticky">
        <div className="hero__inner container">
          <div className="hero__copy">
            <p className="hero__kicker">FlowBook = restaurant control without chaos.</p>
            <h1>Run your restaurant from one clean, smart POS.</h1>
            <p className="hero__subheadline">
              FlowBook brings billing, KOT, tables, staff, customers, reports, sync, and AI-assisted insights together — across desktop and mobile.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#book-demo">
                Book a Demo
              </a>
              <a className="button button--outline" href="#plans">
                View Plans
              </a>
              <a className="button button--accent" href="#smart-crm">
                See Smart CRM
              </a>
            </div>

            <div className="hero__chips" aria-label="Hero feature preview tabs">
              {FEATURES.map((feature, index) => (
                <button
                  key={feature.label}
                  className={`hero__chip ${activeIndex === index ? 'hero__chip--active' : ''}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  {feature.label}
                </button>
              ))}
            </div>

            <p className="hero__benefit" aria-live="polite">{active.benefit}</p>
          </div>

          <div className="hero__visual" aria-label={`${active.label} product preview`}>
            <div className="hero__stage-glow" />

            <div className="hero__desktop card" key={`desktop-${active.label}`}>
              <div className="hero__window-bar">
                <span className="hero__window-dot hero__window-dot--red" />
                <span className="hero__window-dot hero__window-dot--amber" />
                <span className="hero__window-dot hero__window-dot--green" />
                <strong>{active.desktopTitle}</strong>
              </div>
              <div className="hero__workspace">
                <aside className="hero__sidebar" aria-label="POS modules">
                  {FEATURES.slice(0, 6).map((feature) => (
                    <span
                      key={feature.label}
                      className={feature.label === active.label ? 'hero__side-dot hero__side-dot--active' : 'hero__side-dot'}
                    >
                      {feature.label.slice(0, 1)}
                    </span>
                  ))}
                </aside>

                <div className="hero__main-panel">
                  <div className="hero__panel-head">
                    <span>{active.desktopKicker}</span>
                    <strong>{active.desktopAction}</strong>
                  </div>
                  <div className="hero__content-grid">
                    {active.desktopItems.map((item) => (
                      <div className="hero__content-card" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero__side-panel">
                  <div className="hero__side-title">Live context</div>
                  {active.desktopSide.map((item) => (
                    <div className="hero__side-row" key={item}>{item}</div>
                  ))}
                  <div className="hero__side-action">{active.desktopAction}</div>
                </div>
              </div>
            </div>

            <div className="hero__phone" key={`phone-${active.label}`}>
              <div className="hero__phone-notch" />
              <div className="hero__phone-screen">
                <div className="hero__phone-title">{active.mobileTitle}</div>
                <div className="hero__phone-stats">
                  {active.mobileStats.map((stat) => (
                    <div className="hero__phone-stat" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <p>{active.mobileDetail}</p>
              </div>
            </div>

            <div className="hero__floating" key={`float-${active.label}`}>
              {THEATRE_FLOATS.map((card, index) => (
                <div className={`hero__float hero__float--${index + 1} hero__float--${card.tone}`} key={`${card.label}-${card.value}`}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
