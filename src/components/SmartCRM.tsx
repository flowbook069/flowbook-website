import { useState } from 'react'
import './SmartCRM.css'

type CustomerKey = 'rohit' | 'priya' | 'aman' | 'walkin'

type CustomerOrder = {
  title: string
  date?: string
  amount: string
  items: string[]
  payment: string
}

type BehaviourSignal = {
  label: string
  value: string
  detail: string
  tone?: 'gold' | 'green' | 'amber'
}

type CustomerProfile = {
  key: CustomerKey
  name: string
  summary: string
  status: string
  phone?: string
  visits?: string
  spend?: string
  lastVisit?: string
  marketing?: string
  behaviourSignals: BehaviourSignal[]
  orders: CustomerOrder[]
  tags: string[]
  isWalkIn?: boolean
}

const SUGGESTED_TAG = 'Suggested: High-value regular'

const TAG_EXPLANATIONS: Record<string, string> = {
  Regular: 'Visited more than once.',
  'High Spender': 'Spend is higher than the average customer.',
  'Prefers Spicy': 'Often orders spicy items.',
  'Feedback Needed': 'Good candidate for feedback request.',
  'Marketing OK': 'Customer has opted in for updates.',
  'New Customer': 'Only one paid visit so far.',
  'Follow-up Needed': 'Has not visited recently.',
  Vegetarian: 'Often chooses vegetarian items.',
  'Weekend Guest': 'Often visits on weekends.',
  [SUGGESTED_TAG]: 'Based on repeat visits and total spend.',
}

const CUSTOMERS: CustomerProfile[] = [
  {
    key: 'rohit',
    name: 'Rohit',
    summary: '3 visits · ₹1,850',
    status: 'Regular',
    phone: '234567321',
    visits: '3',
    spend: '₹1,850',
    lastVisit: 'This week',
    marketing: 'Opted in',
    behaviourSignals: [
      { label: 'Repeat visits', value: '3 visits', detail: 'Rohit returned across multiple paid bills.', tone: 'green' },
      { label: 'Total spend', value: '₹1,850', detail: 'Spend is tracked from real closed bills.', tone: 'gold' },
      { label: 'Favourite item', value: 'Chilli Chicken', detail: 'Most repeated item in recent orders.', tone: 'amber' },
      { label: 'Last visit', value: 'This week', detail: 'Recent paid bill keeps the profile fresh.', tone: 'green' },
      { label: 'Feedback needed', value: 'Yes', detail: 'Regular customer with recent repeat order.', tone: 'amber' },
      { label: 'Marketing consent', value: 'Opted in', detail: 'Safe to include in updates and follow-ups.', tone: 'green' },
      { label: 'Dormant customer', value: 'No', detail: 'Recent activity means no dormant warning.', tone: 'green' },
      { label: 'High-value regular', value: 'Likely', detail: 'Repeat visits and spend make this a strong suggested segment.', tone: 'gold' },
    ],
    orders: [
      {
        title: 'Chilli Chicken + Fish Chilli',
        date: 'Jul 8',
        amount: '₹618',
        items: ['Chilli Chicken x1', 'Fish Chilli x1', 'Cash payment'],
        payment: 'Cash',
      },
      {
        title: 'Cold Coffee + Sandwich',
        date: 'Jul 2',
        amount: '₹420',
        items: ['Cold Coffee x2', 'Sandwich x1', 'Counter bill'],
        payment: 'Card',
      },
      {
        title: 'Fried Rice',
        date: 'Jun 25',
        amount: '₹812',
        items: ['Fried Rice x2', 'Extra sauce', 'Dine-in'],
        payment: 'UPI',
      },
    ],
    tags: ['Regular', 'High Spender', 'Prefers Spicy', 'Feedback Needed', 'Marketing OK'],
  },
  {
    key: 'priya',
    name: 'Priya',
    summary: '7 visits · ₹4,120',
    status: 'High value',
    phone: '9876543210',
    visits: '7',
    spend: '₹4,120',
    lastVisit: 'Yesterday',
    marketing: 'Opted in',
    behaviourSignals: [
      { label: 'Repeat visits', value: '7 visits', detail: 'Priya is one of the most frequent returning customers.', tone: 'green' },
      { label: 'Total spend', value: '₹4,120', detail: 'High spend comes from paid order history.', tone: 'gold' },
      { label: 'Favourite item', value: 'Paneer Tikka', detail: 'Vegetarian starters repeat in recent orders.', tone: 'amber' },
      { label: 'Last visit', value: 'Yesterday', detail: 'Latest paid bill was recorded yesterday.', tone: 'green' },
      { label: 'Feedback needed', value: 'Maybe', detail: 'Good candidate for feedback after repeat visits.', tone: 'amber' },
      { label: 'Marketing consent', value: 'Opted in', detail: 'Customer can receive updates.', tone: 'green' },
      { label: 'Dormant customer', value: 'No', detail: 'Recent visit means no dormant risk.', tone: 'green' },
      { label: 'High-value regular', value: 'Strong', detail: 'Repeat visits and spend support high-value segment.', tone: 'gold' },
    ],
    orders: [
      {
        title: 'Paneer Tikka + Butter Naan',
        amount: '₹760',
        items: ['Paneer Tikka x1', 'Butter Naan x2', 'Mint chutney'],
        payment: 'UPI',
      },
      {
        title: 'Biryani + Masala Chai',
        amount: '₹520',
        items: ['Veg Biryani x1', 'Masala Chai x1', 'Parcel'],
        payment: 'Cash',
      },
      {
        title: 'Dal Makhani Combo',
        amount: '₹680',
        items: ['Dal Makhani x1', 'Rice x1', 'Butter Naan x1'],
        payment: 'Card',
      },
    ],
    tags: ['Regular', 'High Spender', 'Vegetarian', 'Weekend Guest', 'Marketing OK'],
  },
  {
    key: 'aman',
    name: 'Aman',
    summary: '1 visit · ₹380',
    status: 'New',
    phone: '9123456780',
    visits: '1',
    spend: '₹380',
    lastVisit: 'Last month',
    marketing: 'Not opted in',
    behaviourSignals: [
      { label: 'Repeat visits', value: '1 visit', detail: 'Only one paid visit so far.', tone: 'amber' },
      { label: 'Total spend', value: '₹380', detail: 'Spend comes from the first paid bill.', tone: 'gold' },
      { label: 'Favourite item', value: 'Masala Chai', detail: 'First order signal, not a confirmed habit yet.', tone: 'amber' },
      { label: 'Last visit', value: 'Last month', detail: 'Profile has not been updated recently.', tone: 'amber' },
      { label: 'Feedback needed', value: 'Follow up', detail: 'Good candidate for a first-visit follow-up.', tone: 'amber' },
      { label: 'Marketing consent', value: 'No', detail: 'Do not send marketing updates without consent.', tone: 'amber' },
      { label: 'Dormant customer', value: 'Watch', detail: 'No recent repeat visit yet.', tone: 'amber' },
      { label: 'High-value regular', value: 'Not yet', detail: 'Needs repeat visits before this tag fits.', tone: 'gold' },
    ],
    orders: [
      {
        title: 'Masala Chai + Sandwich',
        amount: '₹380',
        items: ['Masala Chai x2', 'Sandwich x1', 'First visit'],
        payment: 'Cash',
      },
    ],
    tags: ['New Customer', 'Follow-up Needed'],
  },
  {
    key: 'walkin',
    name: 'Walk-in',
    summary: 'Not linked to profile',
    status: 'Unlinked',
    behaviourSignals: [],
    orders: [],
    tags: [],
    isWalkIn: true,
  },
]

const findCustomer = (key: CustomerKey) => CUSTOMERS.find((customer) => customer.key === key) ?? CUSTOMERS[0]

export default function SmartCRM() {
  const [activeKey, setActiveKey] = useState<CustomerKey>('rohit')
  const [expandedOrder, setExpandedOrder] = useState(0)
  const [activeTag, setActiveTag] = useState('Regular')
  const [activeSignal, setActiveSignal] = useState('Repeat visits')
  const [suggestedTags, setSuggestedTags] = useState<Partial<Record<CustomerKey, boolean>>>({})

  const activeCustomer = findCustomer(activeKey)
  const displayTags = suggestedTags[activeKey] ? [...activeCustomer.tags, SUGGESTED_TAG] : activeCustomer.tags
  const activeTagCopy = activeTag ? TAG_EXPLANATIONS[activeTag] : ''
  const activeSignalCopy = activeCustomer.behaviourSignals.find((signal) => signal.label === activeSignal)?.detail ?? ''

  const selectCustomer = (key: CustomerKey) => {
    const nextCustomer = findCustomer(key)

    setActiveKey(key)
    setExpandedOrder(0)
    setActiveTag(nextCustomer.tags[0] ?? '')
    setActiveSignal(nextCustomer.behaviourSignals[0]?.label ?? '')
  }

  const suggestTag = () => {
    if (activeCustomer.isWalkIn) return

    setSuggestedTags((current) => ({ ...current, [activeKey]: true }))
    setActiveTag(SUGGESTED_TAG)
  }

  return (
    <section id="smart-crm" className="crm">
      <div className="container">
        <div className="crm__header" data-reveal-stagger="80">
          <p className="crm__eyebrow">Smart CRM</p>
          <h2>Smart CRM that remembers every customer.</h2>
          <p>
            FlowBook does not just save phone numbers. It links customers to real paid orders — visits, spend, habits, and
            smart tags.
          </p>
        </div>

        <div className="crm__layout">
          <aside className="crm__customers" aria-label="Customer list">
            <div className="crm__customers-top">
              <span>Customer list</span>
              <strong>Paid-order linked</strong>
            </div>
            <div className="crm__customer-scroll">
              {CUSTOMERS.map((customer) => (
                <button
                  key={customer.key}
                  className={`crm__customer ${activeKey === customer.key ? 'crm__customer--active' : ''}`}
                  type="button"
                  aria-pressed={activeKey === customer.key}
                  onClick={() => selectCustomer(customer.key)}
                >
                  <span>
                    <i aria-hidden="true" />
                    {customer.name}
                  </span>
                  <small>{customer.summary}</small>
                  <em>{customer.status}</em>
                </button>
              ))}
            </div>
          </aside>

          <div className="crm__profile" aria-live="polite">
            {activeCustomer.isWalkIn ? (
              <div className="crm__walkin crm__profile-shell" key={activeCustomer.key}>
                <div className="crm__avatar">W</div>
                <h3>Walk-in</h3>
                <p>Walk-in orders are tracked in Sales &amp; Orders, but they are not linked to a customer profile.</p>
                <div className="crm__note">Customer history is based on paid orders, not fake visit counters.</div>
              </div>
            ) : (
              <div className="crm__profile-shell" key={activeCustomer.key}>
                <div className="crm__profile-top">
                  <div className="crm__identity">
                    <div className="crm__avatar">{activeCustomer.name[0]}</div>
                    <div>
                      <span>Customer profile</span>
                      <h3>{activeCustomer.name}</h3>
                      <p>{activeCustomer.phone}</p>
                    </div>
                  </div>
                  <button className="crm__ai-button" type="button" onClick={suggestTag}>
                    ✦ AI Suggest Tag
                  </button>
                </div>

                <div className="crm__stats">
                  <div>
                    <span>Visits</span>
                    <strong>{activeCustomer.visits}</strong>
                  </div>
                  <div>
                    <span>Total spend</span>
                    <strong>{activeCustomer.spend}</strong>
                  </div>
                  <div>
                    <span>Last visit</span>
                    <strong>{activeCustomer.lastVisit}</strong>
                  </div>
                  <div>
                    <span>Marketing</span>
                    <strong>{activeCustomer.marketing}</strong>
                  </div>
                </div>

                <section className="crm__cbt" aria-labelledby="crm-cbt-title">
                  <div className="crm__cbt-copy">
                    <span>Behaviour from bills</span>
                    <h3 id="crm-cbt-title">Customer Behaviour Tracking</h3>
                    <p>
                      Track repeat visits, spend, favourite items, last visit, feedback needs, and marketing consent — all
                      from real paid bills.
                    </p>
                  </div>
                  <div className="crm__signals" aria-label="Customer behaviour signals">
                    {activeCustomer.behaviourSignals.map((signal) => (
                      <button
                        key={signal.label}
                        className={`crm__signal crm__signal--${signal.tone ?? 'green'} ${
                          activeSignal === signal.label ? 'crm__signal--active' : ''
                        }`}
                        type="button"
                        aria-pressed={activeSignal === signal.label}
                        onClick={() => setActiveSignal(signal.label)}
                      >
                        <span>{signal.label}</span>
                        <strong>{signal.value}</strong>
                      </button>
                    ))}
                  </div>
                  <div className="crm__signal-copy" aria-live="polite">
                    <span>{activeSignal || 'Behaviour signal'}</span>
                    <p>{activeSignalCopy || 'Select a behaviour signal to see how FlowBook interprets paid-order history.'}</p>
                  </div>
                </section>

                <div className="crm__content-grid">
                  <div className="crm__panel crm__panel--orders">
                    <div className="crm__panel-heading">
                      <span>Recent orders</span>
                      <strong>Real paid bills</strong>
                    </div>
                    <div className="crm__orders">
                      {activeCustomer.orders.map((order, index) => (
                        <button
                          key={`${activeCustomer.key}-${order.title}`}
                          className={`crm__order ${expandedOrder === index ? 'crm__order--open' : ''}`}
                          type="button"
                          aria-expanded={expandedOrder === index}
                          onClick={() => setExpandedOrder(expandedOrder === index ? -1 : index)}
                        >
                          <span>
                            {order.title}
                            {order.date ? ` · ${order.date}` : ''}
                          </span>
                          <strong>{order.amount}</strong>
                          {expandedOrder === index && (
                            <small>
                              {order.items.join(' · ')}
                              {' · '}
                              Payment: {order.payment}
                            </small>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="crm__panel crm__panel--insight">
                    <div className="crm__panel-heading">
                      <span>AI-ready CRM</span>
                      <strong>Suggested tags</strong>
                    </div>
                    <div className="crm__tags">
                      {displayTags.map((tag) => (
                        <button
                          key={tag}
                          className={`crm__tag ${activeTag === tag ? 'crm__tag--active' : ''} ${
                            tag === SUGGESTED_TAG ? 'crm__tag--suggested' : ''
                          }`}
                          type="button"
                          aria-pressed={activeTag === tag}
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <div className="crm__tag-copy">
                      <span>{activeTag || 'Select a tag'}</span>
                      <p>{activeTagCopy || 'Click a smart tag to see why it appears on the profile.'}</p>
                    </div>
                    <div className="crm__note">Customer history is based on paid orders, not fake visit counters.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
