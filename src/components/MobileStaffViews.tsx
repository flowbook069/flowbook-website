import { useState } from 'react'
import './MobileStaffViews.css'

type RoleKey = 'cashier' | 'waiter' | 'kitchen' | 'manager' | 'owner'

type RoleAccent = 'billing' | 'tables' | 'kot' | 'shift' | 'insight'

type ScreenLine = {
  label: string
  value: string
  tone?: 'gold' | 'green' | 'risk'
}

type StatusCard = {
  label: string
  value: string
  tone?: 'gold' | 'green' | 'risk'
}

type RoleView = {
  key: RoleKey
  accent: RoleAccent
  role: string
  eyebrow: string
  primaryAction: string
  secondaryAction?: string
  lines: ScreenLine[]
  statusCards: StatusCard[]
  benefits: string[]
}

const ROLE_VIEWS: RoleView[] = [
  {
    key: 'cashier',
    accent: 'billing',
    role: 'Cashier',
    eyebrow: 'Counter flow',
    primaryAction: 'Generate Bill',
    secondaryAction: 'Collect Payment',
    lines: [
      { label: 'Current table', value: 'Table 4', tone: 'gold' },
      { label: 'Items', value: 'Chilli Chicken, Fish Chilli' },
      { label: 'Bill total', value: '₹618', tone: 'green' },
    ],
    statusCards: [
      { label: 'Bill state', value: 'Ready', tone: 'green' },
      { label: 'Customer', value: 'Linked', tone: 'gold' },
    ],
    benefits: ['Quick billing', 'Paid/unpaid clarity', 'Customer linking', 'Faster counter flow'],
  },
  {
    key: 'waiter',
    accent: 'tables',
    role: 'Waiter',
    eyebrow: 'Floor workflow',
    primaryAction: 'Add Items',
    secondaryAction: 'Send KOT',
    lines: [
      { label: 'Floor view', value: 'Active tables', tone: 'gold' },
      { label: 'Table 2', value: 'Open', tone: 'green' },
      { label: 'Table 4', value: 'Ordering', tone: 'gold' },
      { label: 'Table 6', value: 'Ready', tone: 'green' },
    ],
    statusCards: [
      { label: 'Active floor', value: 'Dining', tone: 'gold' },
      { label: 'KOT status', value: 'Pending', tone: 'green' },
    ],
    benefits: ['Table-first workflow', 'Fast order taking', 'Less back-and-forth', 'Cleaner KOT handoff'],
  },
  {
    key: 'kitchen',
    accent: 'kot',
    role: 'Kitchen',
    eyebrow: 'Kitchen queue',
    primaryAction: 'Mark Ready',
    lines: [
      { label: 'KOT queue', value: 'Live tickets', tone: 'gold' },
      { label: 'Table 4', value: 'Chilli Chicken x1, Fish Chilli x1' },
      { label: 'Table 6', value: 'Fried Rice x2' },
      { label: 'Status', value: 'New · Preparing · Ready', tone: 'green' },
    ],
    statusCards: [
      { label: 'New tickets', value: '2', tone: 'gold' },
      { label: 'Ready', value: '1', tone: 'green' },
    ],
    benefits: ['Clear KOT queue', 'Fewer missed items', 'Better rush handling', 'Easy reprint context'],
  },
  {
    key: 'manager',
    accent: 'shift',
    role: 'Manager',
    eyebrow: 'Shift control',
    primaryAction: 'Review Orders',
    lines: [
      { label: 'Today sales', value: '₹18,420', tone: 'green' },
      { label: 'Open orders', value: '3', tone: 'gold' },
      { label: 'Bill corrections', value: '1', tone: 'risk' },
      { label: 'Staff active', value: '4', tone: 'green' },
    ],
    statusCards: [
      { label: 'Shift health', value: 'Stable', tone: 'green' },
      { label: 'Review', value: '1 flag', tone: 'risk' },
    ],
    benefits: ['Shift visibility', 'Correction checks', 'Staff activity view', 'Faster floor decisions'],
  },
  {
    key: 'owner',
    accent: 'insight',
    role: 'Owner',
    eyebrow: 'Owner control',
    primaryAction: 'View Insights',
    lines: [
      { label: 'Owner Brief', value: 'Today ready', tone: 'gold' },
      { label: 'Repeat customers', value: '6', tone: 'green' },
      { label: 'Top item', value: 'Chilli Chicken' },
      { label: 'Risk hints', value: '1 correction', tone: 'risk' },
    ],
    statusCards: [
      { label: 'Brief', value: 'Ready', tone: 'gold' },
      { label: 'Action', value: 'Review', tone: 'green' },
    ],
    benefits: ['Business overview', 'AI-assisted signals', 'Multi-device visibility', 'Control without being at counter'],
  },
]

const getRoleView = (key: RoleKey) => ROLE_VIEWS.find((view) => view.key === key) ?? ROLE_VIEWS[0]

export default function MobileStaffViews() {
  const [activeKey, setActiveKey] = useState<RoleKey>('cashier')
  const activeView = getRoleView(activeKey)

  return (
    <section id="mobile-staff-views" className="mobile-views" aria-labelledby="mobile-views-title">
      <div className="container">
        <div className="mobile-views__header" data-reveal-stagger="80">
          <p className="mobile-views__eyebrow">Mobile staff views</p>
          <h2 id="mobile-views-title">Mobile screens made for each restaurant role.</h2>
          <p>
            Cashiers, waiters, kitchen staff, managers, and owners get focused screens for their work — not tiny desktop
            pages squeezed onto a phone.
          </p>
        </div>

        <div className="mobile-views__layout">
          <aside className="mobile-views__roles" aria-label="Restaurant roles">
            <div className="mobile-views__roles-top">
              <span>Choose role</span>
              <strong>Focused screens</strong>
            </div>
            <div className="mobile-views__chips" role="tablist" aria-label="Mobile role views">
              {ROLE_VIEWS.map((view) => (
                <button
                  key={view.key}
                  className={`mobile-views__chip ${activeKey === view.key ? 'mobile-views__chip--active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeKey === view.key}
                  aria-controls="mobile-role-preview"
                  onClick={() => setActiveKey(view.key)}
                >
                  <span aria-hidden="true" />
                  {view.role}
                </button>
              ))}
            </div>
          </aside>

          <div className="mobile-views__phone-wrap" id="mobile-role-preview" role="tabpanel" aria-live="polite">
            <div className="mobile-views__glow" aria-hidden="true" />
            <div className={`mobile-views__phone mobile-views__phone--${activeView.accent}`} key={activeView.key}>
              <div className="mobile-views__speaker" aria-hidden="true" />
              <div className="mobile-views__phone-header">
                <div>
                  <span>{activeView.eyebrow}</span>
                  <h3>{activeView.role}</h3>
                </div>
                <strong>
                  <i aria-hidden="true" />
                  {activeView.role}
                </strong>
              </div>

              <div className="mobile-views__status-grid" aria-label={`${activeView.role} status`}>
                {activeView.statusCards.map((card) => (
                  <div
                    key={`${activeView.key}-${card.label}`}
                    className={`mobile-views__status-card ${card.tone ? `mobile-views__status-card--${card.tone}` : ''}`}
                  >
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                  </div>
                ))}
              </div>

              <div className="mobile-views__screen-lines">
                {activeView.lines.map((line) => (
                  <div
                    key={`${activeView.key}-${line.label}`}
                    className={`mobile-views__line ${line.tone ? `mobile-views__line--${line.tone}` : ''}`}
                  >
                    <span>{line.label}</span>
                    <strong>{line.value}</strong>
                  </div>
                ))}
              </div>

              <div className="mobile-views__actions">
                <button type="button">{activeView.primaryAction}</button>
                {activeView.secondaryAction && <button type="button">{activeView.secondaryAction}</button>}
              </div>
            </div>
          </div>

          <aside
            className={`mobile-views__benefits mobile-views__benefits--${activeView.accent}`}
            key={`${activeView.key}-benefits`}
            aria-label={`${activeView.role} benefits`}
          >
            <div className="mobile-views__benefit-title">
              <span>Role benefits</span>
              <h3>{activeView.role} view</h3>
              <p>Staff see only what they need. Owner gets control. Restaurant stays fast.</p>
            </div>
            <div className="mobile-views__benefit-list">
              {activeView.benefits.map((benefit) => (
                <div key={`${activeView.key}-${benefit}`}>
                  <span aria-hidden="true">✓</span>
                  <strong>{benefit}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
