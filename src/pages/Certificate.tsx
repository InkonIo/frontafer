import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Certificate() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const [cert, setCert] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const token = localStorage.getItem('token')
  const u = localStorage.getItem('user')

  if (token && u) {
    // авторизован — берём из своих сертификатов
    setUser(JSON.parse(u))
    axios.get(`${import.meta.env.VITE_API_URL}/api/certificates/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        const found = r.data.find((c: any) => c.cert_id === id)
        setCert(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  } else {
    // не авторизован — публичный просмотр
    axios.get(`${import.meta.env.VITE_API_URL}/api/certificates/verify/${id}`)
      .then(r => {
        setCert(r.data)
        setUser({ name: r.data.holder_name })
      })
      .catch(() => setCert(null))
      .finally(() => setLoading(false))
  }
}, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', background: '#F4F3EE' }}>
      <div style={{ textAlign: 'center', color: '#777971' }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>⋯</div>
        <div style={{ fontSize: 13, letterSpacing: 2 }}>LOADING CERTIFICATE</div>
      </div>
    </div>
  )

  if (!cert) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', background: '#F4F3EE' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✕</div>
        <h2 style={{ marginBottom: 8 }}>Certificate not found</h2>
        <p style={{ color: '#777971', marginBottom: 24, fontSize: 14 }}>This certificate ID does not exist or has been revoked.</p>
        <button onClick={() => nav('/dashboard')} style={{ padding: '10px 28px', background: '#1B3A6B', color: 'white', border: 'none', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>← Back to Dashboard</button>
      </div>
    </div>
  )

  const date = new Date(cert.issued_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const passed = cert.score >= 60
  const distinction = cert.score >= 90

  return (
    <div style={{ minHeight: '100vh', background: '#ECEAE3', fontFamily: 'Manrope, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav bar */}
      <div style={{ borderBottom: '1px solid #D8D7D0', background: '#FAFAF7', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => nav('/dashboard')} style={{ background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', color: '#777971', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>←</span> Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="22" height="22" viewBox="0 0 22 22">
              <rect width="22" height="22" fill="#1B3A6B" rx="2"/>
              <polygon points="11,3 18,17 4,17" fill="#C8A84B"/>
              <line x1="4" y1="17" x2="18" y2="17" stroke="#C8A84B" strokeWidth="1.5"/>
              <circle cx="11" cy="5" r="1.5" fill="#C8FF55"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: '#1B3A6B' }}>LEVELUP</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                const url = window.location.href
                navigator.clipboard.writeText(url).then(() => {
                  const btn = document.getElementById('share-btn')
                  if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.textContent = '🔗 Share' }, 2000) }
                })
              }}
              id="share-btn"
              style={{ background: 'white', color: '#1B3A6B', border: '1px solid #1B3A6B', padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', letterSpacing: 1 }}
            >
              🔗 Share
            </button>
            <button
              onClick={() => window.print()}
              style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', letterSpacing: 1 }}
            >
              ⬇ Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main cert area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px 0' }}>
        <div id="cert" style={{
          width: '100%', maxWidth: 760,
          background: 'white',
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,.06), 0 20px 60px rgba(0,0,0,.14)',
          fontFamily: 'Manrope, sans-serif',
          overflow: 'hidden',
        }}>

          {/* Outer ornamental border */}
          <div style={{
            position: 'absolute', inset: 10,
            border: '1px solid rgba(200,168,75,.35)',
            pointerEvents: 'none', zIndex: 1
          }} />
          <div style={{
            position: 'absolute', inset: 14,
            border: '1px solid rgba(200,168,75,.18)',
            pointerEvents: 'none', zIndex: 1
          }} />

          {/* Corner ornaments */}
          {[
            { top: 6, left: 6 },
            { top: 6, right: 6 },
            { bottom: 6, left: 6 },
            { bottom: 6, right: 6 },
          ].map((pos, i) => (
            <svg key={i} width="32" height="32" viewBox="0 0 32 32" style={{ position: 'absolute', ...pos, zIndex: 2 }}>
              <path d="M2,2 L14,2 M2,2 L2,14" stroke="#C8A84B" strokeWidth="1.5" fill="none"/>
              <circle cx="2" cy="2" r="2" fill="#C8A84B"/>
              <circle cx="8" cy="8" r="1" fill="rgba(200,168,75,.4)"/>
            </svg>
          ))}

          {/* Watermark */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 0
          }}>
            <svg width="340" height="340" viewBox="0 0 340 340" style={{ opacity: 0.028 }}>
              <text x="170" y="200" textAnchor="middle" fontSize="80" fontWeight="900" fill="#1B3A6B" transform="rotate(-30,170,170)">LEVELUP</text>
            </svg>
          </div>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f2445 0%, #1B3A6B 60%, #1e4280 100%)',
            padding: '32px 48px',
            borderBottom: '4px solid #C8A84B',
            display: 'flex', alignItems: 'center', gap: 20,
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Header bg pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />
            <svg width="52" height="52" viewBox="0 0 52 52" style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <rect width="52" height="52" fill="rgba(255,255,255,.08)" rx="4"/>
              <polygon points="26,7 44,42 8,42" fill="#C8A84B"/>
              <line x1="8" y1="42" x2="44" y2="42" stroke="#C8A84B" strokeWidth="3"/>
              <circle cx="26" cy="11" r="3.5" fill="#C8FF55"/>
            </svg>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ color: 'white', fontSize: 15, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>LEVELUP Institute</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 10, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' }}>Language Certification Authority · Almaty, Kazakhstan</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right', position: 'relative', zIndex: 1 }}>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Certificate No.</div>
              <div style={{ color: '#C8A84B', fontFamily: 'DM Mono, monospace', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{cert.cert_id}</div>
            </div>
          </div>

          {/* Body */}
          <div style={{
            padding: '52px 56px 44px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #ffffff 0%, #FEFCF6 100%)',
            borderBottom: '1px solid #F0E8D0',
            position: 'relative', zIndex: 2
          }}>
            {/* Top decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 36 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #C8A84B)' }} />
              <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#C8A84B"/></svg>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #C8A84B)' }} />
            </div>

            <div style={{ fontSize: 10, letterSpacing: 4, color: '#999890', textTransform: 'uppercase', marginBottom: 20 }}>
              This Certificate is Proudly Presented to
            </div>

            <div style={{
              fontSize: 42, fontWeight: 800, letterSpacing: -1.5, color: '#171816',
              marginBottom: 8, fontStyle: 'italic',
              textShadow: '0 1px 0 rgba(200,168,75,.15)'
            }}>
              {user?.name}
            </div>

            {/* Underline flourish */}
            <svg width="200" height="12" viewBox="0 0 200 12" style={{ marginBottom: 28 }}>
              <path d="M10,6 Q100,12 190,6" stroke="#C8A84B" strokeWidth="1" fill="none"/>
              <circle cx="10" cy="6" r="2" fill="#C8A84B"/>
              <circle cx="190" cy="6" r="2" fill="#C8A84B"/>
              <circle cx="100" cy="10" r="1.5" fill="rgba(200,168,75,.5)"/>
            </svg>

            <div style={{ fontSize: 13, color: '#8A8880', lineHeight: 1.9, marginBottom: 32, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              has successfully completed all requirements of the <strong style={{ color: '#555' }}>LEVELUP Language Proficiency Assessment</strong> and
              demonstrated outstanding competency in
            </div>

            <div style={{
              fontSize: 30, fontWeight: 800, color: '#1B3A6B',
              letterSpacing: 1.5, marginBottom: 20,
              padding: '0 24px 16px',
              borderBottom: '2px solid rgba(200,168,75,.2)'
            }}>
              {cert.course_name}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: passed ? '#C8FF55' : '#FFE0E0',
                color: '#171816', fontSize: 12, fontWeight: 800, letterSpacing: 1.5,
                padding: '8px 20px'
              }}>
                <span>{passed ? '✓' : '✕'}</span>
                SCORE: {cert.score}/100 · {distinction ? 'WITH DISTINCTION' : passed ? 'PASSED' : 'NOT PASSED'}
              </div>
            </div>

            {/* Bottom decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginTop: 36 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(200,168,75,.4))' }} />
              <div style={{ width: 4, height: 4, background: '#C8A84B', transform: 'rotate(45deg)' }} />
              <div style={{ width: 4, height: 4, background: 'rgba(200,168,75,.4)', transform: 'rotate(45deg)' }} />
              <div style={{ width: 4, height: 4, background: '#C8A84B', transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(200,168,75,.4))' }} />
            </div>
          </div>

          {/* Signatures */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '32px 56px', background: '#FDFBF5',
            position: 'relative', zIndex: 2
          }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/sig1.png" alt="signature" style={{ height: 52, marginBottom: 8, mixBlendMode: 'multiply', opacity: 0.85 }} />
              <div style={{ width: 130, height: 1, background: 'linear-gradient(to right, transparent, #C8A84B, transparent)', marginBottom: 10 }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2a28' }}>Dr. A. Seitkali</div>
              <div style={{ fontSize: 9, color: '#999890', letterSpacing: 1.5, marginTop: 3, textTransform: 'uppercase' }}>Academic Director</div>
            </div>

            {/* Center seal */}
            <div style={{ textAlign: 'center' }}>
              <svg width="88" height="88" viewBox="0 0 88 88">
                {/* Outer ring */}
                <circle cx="44" cy="44" r="42" fill="none" stroke="#C8A84B" strokeWidth="1.5"/>
                <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(200,168,75,.4)" strokeWidth="1"/>
                {/* Dotted inner ring */}
                <circle cx="44" cy="44" r="30" fill="none" stroke="#1B3A6B" strokeWidth="1" strokeDasharray="3,3"/>
                {/* Star points around edge */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 - 90) * Math.PI / 180
                  const x = 44 + 39 * Math.cos(angle)
                  const y = 44 + 39 * Math.sin(angle)
                  return <circle key={i} cx={x} cy={y} r="1.5" fill="#C8A84B"/>
                })}
                {/* Inner fill */}
                <circle cx="44" cy="44" r="28" fill="rgba(27,58,107,.04)"/>
                {/* Logo */}
                <polygon points="44,16 52,32 36,32" fill="#C8A84B"/>
                <line x1="36" y1="32" x2="52" y2="32" stroke="#C8A84B" strokeWidth="2"/>
                <circle cx="44" cy="18" r="2" fill="#C8FF55"/>
                {/* Text */}
                <text x="44" y="50" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1B3A6B" letterSpacing="2">LEVELUP</text>
                <text x="44" y="60" textAnchor="middle" fontSize="5.5" fill="#777971" letterSpacing="1.5">CERTIFIED</text>
                <text x="44" y="70" textAnchor="middle" fontSize="5" fill="rgba(200,168,75,.8)" letterSpacing="1">2026</text>
              </svg>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/sig2.png" alt="signature" style={{ height: 52, marginBottom: 8, mixBlendMode: 'multiply', opacity: 0.85 }} />
              <div style={{ width: 130, height: 1, background: 'linear-gradient(to right, transparent, #C8A84B, transparent)', marginBottom: 10 }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2a28' }}>Prof. B. Nurmagambetov</div>
              <div style={{ fontSize: 9, color: '#999890', letterSpacing: 1.5, marginTop: 3, textTransform: 'uppercase' }}>Chief Examiner</div>
            </div>
          </div>

          {/* ID bar */}
          <div style={{
            background: '#F5F2E8',
            borderTop: '2px solid #E8DEC4',
            padding: '14px 48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#999890',
            position: 'relative', zIndex: 2
          }}>
            <span>🔒 {cert.cert_id}</span>
            <span>Issued: {date}</span>
            <span>Verify at levelup.kz/verify</span>
          </div>
        </div>
      </div>

      {/* PAGE FOOTER */}
      <footer style={{ marginTop: 64, background: '#171816', color: 'white', padding: '52px 24px 0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,.08)' }}>

            {/* Brand */}
            <div style={{ flex: '1 1 220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <rect width="28" height="28" fill="#1B3A6B"/>
                  <polygon points="14,4 22,20 6,20" fill="#C8A84B"/>
                  <line x1="6" y1="20" x2="22" y2="20" stroke="#C8A84B" strokeWidth="2"/>
                  <circle cx="14" cy="6.5" r="2" fill="#C8FF55"/>
                </svg>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5 }}>LEVELUP</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', lineHeight: 1.8, maxWidth: 240 }}>
                Official language proficiency certification for educators and professionals across Central Asia.
              </p>
            </div>

            {/* Contact */}
            <div style={{ flex: '1 1 180px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', marginBottom: 16 }}>Contact Us</div>
              {[
                { icon: '✉', label: 'inkonio@bk.ru' },
                { icon: '🌐', label: 'levelup.kz' },
                { icon: '📍', label: 'Almaty, Kazakhstan' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
                  <span style={{ fontSize: 14, width: 18, flexShrink: 0 }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div style={{ flex: '1 1 160px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', marginBottom: 16 }}>Programs</div>
              {['English B1', 'English B2', 'German A2', 'German B1', 'View all courses →'].map(item => (
                <div key={item} style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 10, cursor: 'pointer' }}>{item}</div>
              ))}
            </div>

            {/* Legal */}
            <div style={{ flex: '1 1 160px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', marginBottom: 16 }}>Legal</div>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Certificate Verification', 'Accreditation Info'].map(item => (
                <div key={item} onClick={() => nav('/legal')} style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 10, cursor: 'pointer', transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}
                >{item}</div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
            padding: '20px 0',
            fontSize: 11, color: 'rgba(255,255,255,.22)'
          }}>
            <span>© 2026 LEVELUP Institute. All rights reserved.</span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10 }}>
              {cert.cert_id} · Authenticated Document
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}