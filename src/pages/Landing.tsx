import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" fill="#1B3A6B"/>
              <path d="M8 28L19 10L30 28H8Z" fill="none" stroke="#C8A84B" strokeWidth="2.2" strokeLinejoin="round"/>
              <path d="M13 21.5H25" stroke="#C8A84B" strokeWidth="2"/>
              <circle cx="19" cy="10" r="2.5" fill="#C8FF55"/>
            </svg>
            <span className="logo-text">LEVELUP<span style={{color:'var(--gold)'}}>.</span></span>
          </Link>
          <div className="nav-links">
            <a href="#courses">Courses</a>
            <a href="#how">How it works</a>
            <Link to="/login" className="nav-login-link">Sign in</Link>
            <Link to="/register" className="btn-nav">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          PROFESSIONAL DEVELOPMENT · GERMANY EXCHANGE PROGRAMME
        </div>
        <h1 className="hero-title">
          We send our<br/>
          <span className="hero-title-accent">best educators</span><br/>
          to Germany
        </h1>
        <p className="hero-sub">
          Pass the language certification — and get a chance to join our professional
          exchange programme at partner universities in Germany.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn-primary">Start for free →</Link>
          <a href="#courses" className="btn-secondary">View courses</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-n">2,400+</span><span className="stat-l">Certified Educators</span></div>
          <div className="stat-div"></div>
          <div className="stat"><span className="stat-n">4</span><span className="stat-l">CEFR Levels</span></div>
          <div className="stat-div"></div>
          <div className="stat"><span className="stat-n">EN + DE</span><span className="stat-l">Languages</span></div>
          <div className="stat-div"></div>
          <div className="stat"><span className="stat-n">98%</span><span className="stat-l">Pass rate</span></div>
        </div>
      </section>

      {/* GERMANY SECTION */}
      <section className="germany-section">
        <div className="section-inner">
          <div className="germany-text">
            <div className="section-label">WHY CERTIFY</div>
            <h2>Your certificate opens<br/>doors to Germany</h2>
            <p>Every year we select top-certified educators for a fully-funded professional development exchange at our partner institutions in Berlin, Munich and Hamburg. Your language score is your ticket.</p>
            <div className="germany-points">
              <div className="gp"><span>✓</span> Fully funded 3-month exchange</div>
              <div className="gp"><span>✓</span> Partner universities in Berlin, Munich, Hamburg</div>
              <div className="gp"><span>✓</span> Certificate recognised internationally</div>
              <div className="gp"><span>✓</span> Priority for B2 and higher graduates</div>
            </div>
          </div>
          <div className="germany-photos">
  <div className="photo-grid">
    <div className="photo-card">
      <img src="/photo1.jpg" alt="Berlin" />
      <div className="photo-label">Berlin · Humboldt University</div>
    </div>
    <div className="photo-card">
      <img src="/photo2.jpg" alt="Munich" />
      <div className="photo-label">Munich · LMU Campus</div>
    </div>
    <div className="photo-card">
      <img src="/photo3.jpg" alt="Hamburg" />
      <div className="photo-label">Hamburg · Exchange 2024</div>
    </div>
    <div className="photo-card">
      <img src="/photo4.jpg" alt="Graduates" />
      <div className="photo-label">Our graduates abroad</div>
    </div>
  </div>
</div>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-inner">
          <div className="section-label light">HOW IT WORKS</div>
          <h2 className="light-h2">Three steps to your certificate</h2>
          <div className="steps">
            {[
              { n:'01', title:'Register & choose course', desc:'Create your account and select the language level that matches your goals.' },
              { n:'02', title:'Complete the test', desc:'Take our adaptive qualification test — 40 questions, 60 minutes. Available anytime.' },
              { n:'03', title:'Download certificate', desc:'Pass with 70%+ and receive an official PDF certificate recognised by Abai University.' },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="logo">
              <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
                <rect width="38" height="38" fill="#1B3A6B"/>
                <path d="M8 28L19 10L30 28H8Z" fill="none" stroke="#C8A84B" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M13 21.5H25" stroke="#C8A84B" strokeWidth="2"/>
                <circle cx="19" cy="10" r="2.5" fill="#C8FF55"/>
              </svg>
              <span className="logo-text">LEVELUP<span style={{color:'var(--gold)'}}>.</span></span>
            </div>
            <p>Professional language certification<br/>for educators and faculty.</p>
          </div>
          <div className="footer-links">
            <div>
              <div className="footer-col-title">Platform</div>
              <Link to="/register">Register</Link>
              <Link to="/login">Sign in</Link>
              <a href="#courses">Courses</a>
            </div>
            <div>
              <div className="footer-col-title">Support</div>
              <a href="mailto:inkonio@bk.ru">inkonio@bk.ru</a>
              <a href="#how">How it works</a>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <Link to="/legal">Privacy Policy</Link>
              <Link to="/legal">Terms of Service</Link>
              <Link to="/legal">Cookie Policy</Link>
              <Link to="/legal">Certificate Verification</Link>
              <Link to="/legal">Accreditation Info</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 LEVELUP Platform</div>
      </footer>

      <a href="mailto:inkonio@bk.ru" className="chat-btn" title="Contact support">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </a>
    </div>
  )
}