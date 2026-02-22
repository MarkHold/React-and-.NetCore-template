import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import Dashboard from './Dashboard'

type AgentStatus = 'online' | 'busy' | 'offline'

interface Agent {
  id: string
  name: string
  role: string
  status: AgentStatus
  description: string
  capabilities: string[]
  avatar: string
  department: string
}

interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: Date
  isAi: boolean
}

type IconProps = {
  size?: number
}

type MessageMap = Record<string, ChatMessage[]>

const Icons = {
  LayoutDashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  MessageSquare: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Search: ({ size = 18 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  Info: ({ size = 20 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  ),
  CheckCircle2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Clock: ({ size = 16 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ShieldCheck: ({ size = 24 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  ChevronRight: ({ size = 20 }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  UserCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  ),
}

const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Dr. Sarah AI',
    role: 'Clinical Diagnosis Assistant',
    status: 'online',
    description:
      'Specialized in analyzing patient symptoms and suggesting differential diagnoses based on latest clinical guidelines.',
    capabilities: ['Symptom Analysis', 'Clinical Guidelines', 'Medication Interaction'],
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100',
    department: 'Diagnostics',
  },
  {
    id: 'agent-2',
    name: 'PureOps Optimizer',
    role: 'Operations & Logistics',
    status: 'busy',
    description:
      'Optimizing hospital workflow, bed management, and resource allocation across PureHealth facilities.',
    capabilities: ['Resource Tracking', 'Workflow Automation', 'Predictive Analytics'],
    avatar:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100',
    department: 'Operations',
  },
  {
    id: 'agent-3',
    name: 'HealthClaims Pro',
    role: 'Insurance & Billing Specialist',
    status: 'online',
    description:
      'Automated auditing of insurance claims and billing codes to ensure accuracy and compliance.',
    capabilities: ['Claims Auditing', 'ICD-10 Mapping', 'Revenue Cycle Management'],
    avatar:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=100&h=100',
    department: 'Finance',
  },
]

const INITIAL_MESSAGES: MessageMap = {
  'agent-1': [
    {
      id: '1',
      senderId: 'agent-1',
      text: 'Hello! I am Dr. Sarah AI. How can I assist with patient clinical data today?',
      timestamp: new Date(),
      isAi: true,
    },
  ],
  'agent-2': [
    {
      id: '2',
      senderId: 'agent-2',
      text: 'Operations dashboard is ready. We have high occupancy in the Northern wing.',
      timestamp: new Date(),
      isAi: true,
    },
  ],
  'agent-3': [
    {
      id: '3',
      senderId: 'agent-3',
      text: 'Ready to audit claims batches. Please upload the CSV.',
      timestamp: new Date(),
      isAi: true,
    },
  ],
}

interface StatusIndicatorProps {
  status: AgentStatus
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  return <span className={`status-indicator status-${status}`} />
}

function BrandLogo() {
  return (
    <div className="brand-logo">
      <div className="brand-logo-icon">
        <Icons.ShieldCheck />
      </div>
      <div className="brand-logo-text">
        <span className="brand-title">PureHealth</span>
        <span className="brand-subtitle">AI Hub</span>
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: Icons.LayoutDashboard, label: 'Dashboard' },
  { id: 'agents', icon: Icons.Users, label: 'AI Agents' },
  { id: 'conversations', icon: Icons.MessageSquare, label: 'History' },
  { id: 'settings', icon: Icons.Settings, label: 'Settings' },
]

function App() {
  const [activeTab, setActiveTab] = useState('agents')
  const [selectedAgentId, setSelectedAgentId] = useState(MOCK_AGENTS[0].id)
  const [messages, setMessages] = useState<MessageMap>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768)
  const [isDetailsOpen, setDetailsOpen] = useState(window.innerWidth >= 1024)
  const [searchQuery, setSearchQuery] = useState('')
  const isDashboardView = activeTab === 'dashboard'

  const activeAgent = useMemo(
    () => MOCK_AGENTS.find((agent) => agent.id === selectedAgentId) ?? MOCK_AGENTS[0],
    [selectedAgentId],
  )

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedValue = inputValue.trim()

    if (!trimmedValue) {
      return
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      text: trimmedValue,
      timestamp: new Date(),
      isAi: false,
    }

    setMessages((previousMessages) => ({
      ...previousMessages,
      [selectedAgentId]: [...(previousMessages[selectedAgentId] ?? []), newMessage],
    }))

    setInputValue('')

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: selectedAgentId,
        text: `I've received your request regarding "${newMessage.text}". I am currently processing this within the PureHealth secure environment.`,
        timestamp: new Date(),
        isAi: true,
      }

      setMessages((previousMessages) => ({
        ...previousMessages,
        [selectedAgentId]: [...(previousMessages[selectedAgentId] ?? []), aiResponse],
      }))
    }, 1000)
  }

  return (
    <div className="purehealth-app">
      <aside className={`app-sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <BrandLogo />

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const ItemIcon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`nav-button ${activeTab === item.id ? 'nav-button-active' : ''}`}
              >
                <ItemIcon />
                {isSidebarOpen && <span className="nav-label">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {isSidebarOpen && (
          <div className="recent-agents-panel">
            <h3 className="recent-agents-title">Recent Agents</h3>
            <div className="recent-agents-list">
              {MOCK_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`recent-agent-button ${selectedAgentId === agent.id ? 'recent-agent-button-active' : ''}`}
                >
                  <div className="agent-avatar-wrap">
                    <img src={agent.avatar} className="agent-avatar" alt={agent.name} />
                    <span className="agent-status-badge">
                      <StatusIndicator status={agent.status} />
                    </span>
                  </div>
                  <div className="recent-agent-text">
                    <p className="recent-agent-name">{agent.name}</p>
                    <p className="recent-agent-role">{agent.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="sidebar-toggle-panel">
          <button
            type="button"
            onClick={() => setSidebarOpen((previous) => !previous)}
            className="sidebar-toggle-button"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <Icons.Menu /> : <Icons.ChevronRight />}
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="app-header">
          <div className="header-left">
            <button
              type="button"
              className="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen((previous) => !previous)}
              aria-label="Toggle sidebar"
            >
              <Icons.Menu />
            </button>
            <div className="active-agent-header">
              <h1 className="active-agent-title">{isDashboardView ? 'CEO Dashboard' : activeAgent.name}</h1>
              {isDashboardView ? (
                <div className="dashboard-mode-pill">EXECUTIVE</div>
              ) : (
                <div className="active-agent-status-pill">
                  <span className="status-pulse" />
                  {activeAgent.status.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="header-search-area">
            <div className="search-input-wrap">
              <span className="search-icon">
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder={
                  isDashboardView
                    ? 'Search dashboard metrics and entities...'
                    : 'Search across agents and insights...'
                }
                className="search-input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="header-right">
            <button type="button" className="icon-button bell-button" aria-label="Notifications">
              <Icons.Bell />
              <span className="notification-dot" />
            </button>
            {!isDashboardView && (
              <button
                type="button"
                className="icon-button mobile-details-toggle"
                onClick={() => setDetailsOpen((previous) => !previous)}
                aria-label="Toggle details"
              >
                <Icons.Info />
              </button>
            )}

            <div className="header-divider" />

            <div className="user-chip">
              <div className="user-chip-text">
                <p className="user-name">Ahmad Khalid</p>
                <p className="user-role">PureHealth Admin</p>
              </div>
              <div className="user-avatar">AK</div>
            </div>
          </div>
        </header>

        <div className="content-row">
          {isDashboardView ? (
            <div className="dashboard-content-shell">
              <Dashboard />
            </div>
          ) : (
            <>
              <div className="chat-panel">
                <div className="messages-scroll">
                  {(messages[selectedAgentId] ?? []).map((message) => (
                    <div key={message.id} className={`message-row ${message.isAi ? 'message-row-ai' : 'message-row-user'}`}>
                      <div className={`message-block ${message.isAi ? '' : 'message-block-user'}`}>
                        <div className={`message-avatar ${message.isAi ? 'message-avatar-ai' : 'message-avatar-user'}`}>
                          {message.isAi ? (
                            <img src={activeAgent.avatar} className="message-agent-avatar" alt={activeAgent.name} />
                          ) : (
                            <span className="message-user-icon">
                              <Icons.UserCircle />
                            </span>
                          )}
                        </div>

                        <div className={`message-bubble ${message.isAi ? 'message-bubble-ai' : 'message-bubble-user'}`}>
                          <p className="message-text">{message.text}</p>
                          <p className="message-time">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="composer-wrap">
                  <form onSubmit={handleSendMessage} className="composer-form">
                    <div className="composer-input-shell">
                      <button type="button" className="composer-plus-button" aria-label="Add attachment">
                        <Icons.Plus />
                      </button>

                      <input
                        type="text"
                        placeholder={`Message ${activeAgent.name}...`}
                        className="composer-input"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                      />

                      <button type="submit" disabled={!inputValue.trim()} className="composer-send-button" aria-label="Send message">
                        <Icons.Send />
                      </button>
                    </div>

                    <p className="composer-footnote">
                      AI-generated medical insights should be validated by certified PureHealth practitioners.
                    </p>
                  </form>
                </div>
              </div>

              {isDetailsOpen && (
                <aside className="details-panel">
                  <div className="details-header">
                    <h2 className="details-title">Agent Details</h2>
                    <button
                      type="button"
                      onClick={() => setDetailsOpen(false)}
                      className="details-close-button"
                      aria-label="Close details"
                    >
                      <Icons.X />
                    </button>
                  </div>

                  <div className="details-content">
                    <div className="details-profile">
                      <div className="details-avatar-wrap">
                        <img src={activeAgent.avatar} className="details-avatar" alt={activeAgent.name} />
                        <div className="details-avatar-status-wrap">
                          <span className="details-avatar-status" />
                        </div>
                      </div>
                      <h3 className="details-name">{activeAgent.name}</h3>
                      <p className="details-role">{activeAgent.role}</p>
                    </div>

                    <div className="details-sections">
                      <div>
                        <h4 className="details-section-title">Description</h4>
                        <p className="details-description">{activeAgent.description}</p>
                      </div>

                      <div>
                        <h4 className="details-section-title">Capabilities</h4>
                        <div className="capabilities-list">
                          {activeAgent.capabilities.map((capability) => (
                            <span key={capability} className="capability-pill">
                              <Icons.CheckCircle2 />
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="details-actions">
                      <button type="button" className="details-action-button">
                        <span className="details-action-left">
                          <span className="details-action-icon">
                            <Icons.Clock />
                          </span>
                          View Shared Files
                        </span>
                        <Icons.ChevronRight size={14} />
                      </button>
                      <button type="button" className="details-action-button">
                        <span className="details-action-left">
                          <span className="details-action-icon">
                            <Icons.Info size={16} />
                          </span>
                          Data Usage Policy
                        </span>
                        <Icons.ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="details-footer">
                    <div className="details-footer-content">
                      <Icons.ShieldCheck size={20} />
                      <p className="details-footer-text">PureHealth Secure Node v2.4</p>
                    </div>
                  </div>
                </aside>
              )}

              {!isDetailsOpen && (
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="details-floating-open"
                  aria-label="Open agent details"
                  title="Open agent details"
                >
                  <span className="details-floating-open-text">i</span>
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App