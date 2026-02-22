import './Dashboard.css'

type Development = 'positive' | 'negative'

interface MonthlySummaryRow {
  company: string
  month: string
  summary: string
  development: Development
}

interface KpiCard {
  label: string
  value: string
  delta: string
  trend: Development
}

const KPI_CARDS: KpiCard[] = [
  { label: 'Group Revenue', value: '$428.3M', delta: '+6.4% vs last month', trend: 'positive' },
  { label: 'Operating Margin', value: '18.7%', delta: '+1.2 pts improvement', trend: 'positive' },
  { label: 'Cost Per Encounter', value: '$142', delta: '-3.1% optimization', trend: 'positive' },
  { label: 'Regulatory Incidents', value: '7', delta: '+2 unresolved actions', trend: 'negative' },
]

const MONTHLY_SUMMARY_ROWS: MonthlySummaryRow[] = [
  {
    company: 'SEHA',
    month: 'November 2025',
    summary:
      'Northstar Care Holdings posted steady top line growth as outpatient volume improved across urban clinics and payer mix shifted toward higher reimbursement commercial plans. Management contained labor inflation through revised staffing ratios and reduced agency dependence, lifting operating margin for the third consecutive month. Patient satisfaction scores rose after introducing weekend care pods, and readmission rates eased in cardiology. Digital scheduling adoption reached sixty eight percent, cutting no show losses and improving capacity use. Cash conversion also improved as receivables aged over ninety days declined. Winter respiratory demand and regional nursing turnover remain risks, but near term execution remains strong.',
    development: 'positive',
  },
  {
    company: 'Daman',
    month: 'November 2025',
    summary:
      'Meridian Diagnostics delivered mixed results in November as molecular testing volumes were strong but routine panels softened after contract repricing in two key regions. Revenue grew modestly, yet margin narrowed because reagent costs rose faster than expected and instrument downtime increased overtime expense. Turnaround times slipped in the central lab, pushing service credits higher and weakening client retention among small provider groups. Leadership launched a procurement reset and accelerated automation upgrades, but benefits are likely delayed until the next quarter. Working capital also tightened as delayed insurer remittances expanded days sales outstanding, leaving performance direction cautious and currently negative.',
    development: 'negative',
  },
  {
    company: 'Rafed',
    month: 'December 2025',
    summary:
      'Alpine TeleHealth Group continued momentum in December with strong virtual primary care demand, stronger subscription renewals, and a higher conversion rate from free triage sessions into recurring care plans. Provider utilization improved after introducing dynamic appointment routing, reducing idle slots and improving clinician productivity without adding overtime. Member churn dropped as chronic care coaching expanded and response times in behavioral health channels improved. EBITDA expanded on the back of lower customer acquisition cost and disciplined infrastructure spending. While reimbursement policy debates remain an external uncertainty, the company entered year end with healthy pipeline conversion, stable cash generation, and broadly favorable operating signals.',
    development: 'positive',
  },
  {
    company: 'PureLab',
    month: 'December 2025',
    summary:
      'Greenfield Surgical Systems faced pressure in December after elective procedure volume fell below plan in two major hospital networks that deferred surgeries during staffing constraints. Revenue missed target and gross margin contracted as fixed manufacturing overhead was absorbed across fewer unit shipments. Quality metrics stayed acceptable, but a higher scrap rate on a new product batch drove rework costs and delayed deliveries. Sales teams secured several promising contracts, yet implementation timelines slipped because training resources were stretched. Management initiated a cost containment program and adjusted production cadence, though near term performance still reflects execution strain and the operating outlook remains negative.',
    development: 'negative',
  },
  {
    company: 'PureCS',
    month: 'January 2026',
    summary:
      'Lumina Pharmacy Network reported a constructive start to the year with prescription volume growth across specialty categories and better generic substitution rates in high cost therapeutic classes. Gross profit improved as inventory planning reduced emergency purchasing and cut wastage in cold chain products. Store level productivity increased after workflow redesign and central verification rollout, shortening customer wait times and lifting adherence program enrollments. Claims rejection rates fell following edits to prior authorization logic, supporting both revenue integrity and patient retention. Although inflationary rent escalators continue to pressure certain locations, overall trends point to resilient demand, improved efficiency, and positive near term development.',
    development: 'positive',
  },
  {
    company: 'OneHealth',
    month: 'January 2026',
    summary:
      'Harbor Mental Wellness showed softer operating results as therapist attrition accelerated in three states, reducing available appointment capacity and extending patient wait lists. Revenue growth slowed materially despite higher demand because onboarding delays prevented quick replacement of departed clinicians. Cancellation rates rose, and intake conversion declined after service level targets were missed in call center operations. The business also absorbed one time legal and compliance costs tied to updated documentation standards, compressing margin more than expected. Leadership has initiated retention incentives, expanded university recruiting partnerships, and deployed scheduling fixes, but current quarter indicators remain weak and sentiment for development is negative.',
    development: 'negative',
  },
  {
    company: 'Sakina',
    month: 'January 2026',
    summary:
      'Atlas Rehab Centers posted stable gains as referral volume from orthopedic partners increased and average treatment completion rates improved across flagship facilities. Revenue growth outpaced plan while clinician productivity rose due to standardized care pathways and improved therapist scheduling. Patient outcomes strengthened with measurable improvements in recovery milestones, supporting stronger payer confidence and better contract economics in renewal negotiations. Administrative expense declined after centralizing billing operations and automating repetitive eligibility checks. Capital spending stayed within plan while cash collections accelerated on older claims. Weather disruptions present short term uncertainty in two regions, but overall execution and underlying demand indicate positive development momentum.',
    development: 'positive',
  },
  {
    company: 'SEHA Clinics',
    month: 'February 2026',
    summary:
      'Vertex HomeCare Services delivered underwhelming February performance after referral intake dropped in rural markets and travel related costs exceeded budget. Gross margin declined as fuel surcharges and overtime increased when route density deteriorated. Patient satisfaction remained acceptable, yet missed visit incidents rose because scheduling tools failed to adapt quickly to weather driven disruptions. The company also recorded higher bad debt expense from legacy receivables tied to discontinued contracts, offsetting gains from new digital documentation workflows. Management is rebalancing territory coverage and renegotiating vendor rates, but near term profitability remains constrained and overall monthly development is best characterized as negative.',
    development: 'negative',
  },
]

const REVENUE_TREND = [
  { company: 'SEHA', actualRevenue: 86, projectedRevenue: 82 },
  { company: 'Daman', actualRevenue: 74, projectedRevenue: 78 },
  { company: 'Rafed', actualRevenue: 69, projectedRevenue: 65 },
  { company: 'PureLab', actualRevenue: 58, projectedRevenue: 61 },
  { company: 'PureCS', actualRevenue: 63, projectedRevenue: 60 },
  { company: 'OneHealth', actualRevenue: 72, projectedRevenue: 75 },
  { company: 'Sakina', actualRevenue: 56, projectedRevenue: 52 },
  { company: 'SEHA Clinics', actualRevenue: 66, projectedRevenue: 64 },
]

const INITIATIVES = [
  { initiative: 'Payer Contract Repricing Program', owner: 'Finance Office', target: 'Q2 2026', progress: 72 },
  { initiative: 'Cross-Network Staffing Optimization', owner: 'Operations', target: 'Q2 2026', progress: 61 },
  { initiative: 'AI Triage Rollout in 12 Facilities', owner: 'Clinical IT', target: 'Q3 2026', progress: 48 },
  { initiative: 'Supply Chain Resilience Expansion', owner: 'Procurement', target: 'Q3 2026', progress: 56 },
  { initiative: 'Enterprise Compliance Refresh', owner: 'Risk & Legal', target: 'Q2 2026', progress: 84 },
]

const RISK_WATCHLIST = [
  { area: 'Labor Attrition', exposure: 68, note: 'Behavioral health turnover in east region remains elevated.' },
  { area: 'Claims Denials', exposure: 44, note: 'Denials improving but two insurers remain above baseline.' },
  { area: 'Supply Volatility', exposure: 37, note: 'Critical devices are covered, secondary vendors still needed.' },
  { area: 'Cybersecurity', exposure: 29, note: 'No active incidents, controls validated in January audit.' },
]

const formatMillions = (value: number) => `${(value / 10).toFixed(3)}M`

function Dashboard() {
  return (
    <section className="ceo-dashboard" aria-label="CEO dashboard">
      <div className="dashboard-header-block">
        <div>
          <p className="dashboard-eyebrow">Executive View</p>
          <h2 className="dashboard-title">Group Performance Dashboard</h2>
          <p className="dashboard-subtitle">
            Consolidated operating and financial signals for CEO review across portfolio companies.
          </p>
        </div>
        <div className="dashboard-tags">
          <span className="dashboard-tag">Board Packet</span>
          <span className="dashboard-tag">Updated February 2026</span>
        </div>
      </div>

      <div className="dashboard-kpis">
        {KPI_CARDS.map((card) => (
          <article key={card.label} className="dashboard-card kpi-card">
            <p className="kpi-label">{card.label}</p>
            <p className="kpi-value">{card.value}</p>
            <p className={`kpi-delta ${card.trend === 'positive' ? 'kpi-delta-positive' : 'kpi-delta-negative'}`}>
              {card.delta}
            </p>
          </article>
        ))}
      </div>

      <div className="dashboard-grid-layout">
        <article className="dashboard-card trend-card">
          <div className="card-headline-wrap">
            <h3 className="card-title">Actual Revenue vs Projected Revenue</h3>
            <p className="card-subtitle">Updated: 01/02/2025</p>
          </div>
          <div className="bar-chart" role="img" aria-label="Actual and projected revenue bar chart by company">
            {REVENUE_TREND.map((point) => {
              const barsAreClose = Math.abs(point.actualRevenue - point.projectedRevenue) < 8
              let actualLabelOffsetRem = 0.18
              let projectedLabelOffsetRem = 0.18

              if (barsAreClose) {
                if (point.actualRevenue >= point.projectedRevenue) {
                  actualLabelOffsetRem = 0.58
                } else {
                  projectedLabelOffsetRem = 0.58
                }
              }

              return (
                <div key={point.company} className="bar-group">
                  <div className="bar-stack">
                    <span className="bar-column">
                      <span
                        className="bar-value-label bar-value-label-revenue"
                        style={{ bottom: `calc(${point.actualRevenue}% + ${actualLabelOffsetRem}rem)` }}
                      >
                        {formatMillions(point.actualRevenue)}
                      </span>
                      <span
                        className="bar-revenue"
                        style={{ height: `${point.actualRevenue}%` }}
                        title={`Actual Revenue ${point.actualRevenue}`}
                      />
                    </span>
                    <span className="bar-column">
                      <span
                        className="bar-value-label bar-value-label-projected"
                        style={{ bottom: `calc(${point.projectedRevenue}% + ${projectedLabelOffsetRem}rem)` }}
                      >
                        {formatMillions(point.projectedRevenue)}
                      </span>
                      <span
                        className="bar-margin"
                        style={{ height: `${point.projectedRevenue}%` }}
                        title={`Projected Revenue ${point.projectedRevenue}`}
                      />
                    </span>
                  </div>
                  <p className="bar-label">{point.company}</p>
                </div>
              )
            })}
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot legend-revenue" />Actual Revenue</span>
            <span className="legend-item"><span className="legend-dot legend-margin" />Projected Revenue</span>
          </div>
        </article>

        <article className="dashboard-card monthly-summary-card">
          <div className="card-headline-wrap">
            <h3 className="card-title">Monthly Summary</h3>
            <p className="card-subtitle">Sentiment-tagged leadership narrative by company</p>
          </div>

          <div className="monthly-summary-table-wrap">
            <table className="monthly-summary-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Month</th>
                  <th>Summary</th>
                  <th>Development</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY_SUMMARY_ROWS.map((row) => (
                  <tr key={`${row.company}-${row.month}`}>
                    <td className="company-cell">{row.company}</td>
                    <td className="month-cell">{row.month}</td>
                    <td className="summary-cell">{row.summary}</td>
                    <td className={`development-cell development-${row.development}`}>{row.development}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboard-card initiatives-card">
          <div className="card-headline-wrap">
            <h3 className="card-title">Strategic Initiatives</h3>
            <p className="card-subtitle">Execution pipeline through Q3 2026</p>
          </div>

          <div className="initiatives-table-wrap">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Initiative</th>
                  <th>Owner</th>
                  <th>Target</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {INITIATIVES.map((item) => (
                  <tr key={item.initiative}>
                    <td>{item.initiative}</td>
                    <td>{item.owner}</td>
                    <td>{item.target}</td>
                    <td>
                      <div className="progress-track">
                        <span className="progress-fill" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="progress-value">{item.progress}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboard-card risk-card">
          <div className="card-headline-wrap">
            <h3 className="card-title">Risk Watchlist</h3>
            <p className="card-subtitle">Current operational risk exposure</p>
          </div>

          <div className="risk-list">
            {RISK_WATCHLIST.map((item) => (
              <div key={item.area} className="risk-item">
                <div className="risk-item-head">
                  <p className="risk-area">{item.area}</p>
                  <p className="risk-score">{item.exposure}</p>
                </div>
                <div className="risk-track">
                  <span className="risk-fill" style={{ width: `${item.exposure}%` }} />
                </div>
                <p className="risk-note">{item.note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Dashboard
