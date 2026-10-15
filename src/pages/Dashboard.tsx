import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const courses = [
  { id: 'english-b1', lang: 'EN', level: 'B1', title: 'English for Educators', hours: 40 },
  { id: 'english-b2', lang: 'EN', level: 'B2', title: 'Advanced English', hours: 60 },
  { id: 'german-a2', lang: 'DE', level: 'A2', title: 'Deutsch für Anfänger', hours: 40 },
  { id: 'german-b1', lang: 'DE', level: 'B1', title: 'Deutsch Mittelstufe', hours: 60 },
]

export default function Dashboard() {
  const nav = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [certs, setCerts] = useState<any[]>([])

  useEffect(() => {
    const u = localStorage.getItem('user')
    const t = localStorage.getItem('token')
    if (!u || !t) { nav('/login'); return }
    setUser(JSON.parse(u))
    axios.get('http://localhost:8000/api/certificates/my', { headers: { Authorization: `Bearer ${t}` } })
      .then(r => setCerts(r.data)).catch(() => {})
  }, [])

  const logout = () => { localStorage.clear(); nav('/') }

  if (!user) return null

  return (
    <div className="dash">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">LEVELUP<span className="logo-dot">.</span></Link>
          <div className="nav-links">
            <span style={{fontSize:13, color:'var(--gray)'}}>Welcome, {user.name}</span>
            <button onClick={logout} className="nav-login" style={{background:'none',border:'none',fontSize:14,cursor:'pointer'}}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="dash-inner">
        <div className="dash-head">
          <div>
            <h1>Your Dashboard</h1>
            <p>{user.email}</p>
          </div>
          <div className="xp-badge">
            <span className="xp-n">{user.xp || 0}</span>
            <span className="xp-l">XP earned</span>
          </div>
        </div>

        {certs.length > 0 && (
          <div className="dash-section">
            <h2>Your Certificates</h2>
            <div className="cert-list">
              {certs.map((c: any) => (
                <Link to={`/certificate/${c.cert_id}`} className="cert-row" key={c.cert_id} state={c}>
                  <div>
                    <div className="cert-name">{c.course_name}</div>
                    <div className="cert-id">{c.cert_id}</div>
                  </div>
                  <div className="cert-score">{c.score}/100</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="dash-section">
          <h2>Available Courses</h2>
          <div className="courses-grid">
            {courses.map(c => (
              <Link to={`/course/${c.id}`} className="course-card" key={c.id}>
                <div className="course-top">
                  <span className="course-lang">{c.lang}</span>
                  <span className="course-level">{c.level}</span>
                </div>
                <h3>{c.title}</h3>
                <div className="course-footer">
                  <span>{c.hours}h</span>
                  <span className="course-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}