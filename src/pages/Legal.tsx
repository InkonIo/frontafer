import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'cookies', label: 'Cookie Policy' },
  { id: 'verification', label: 'Certificate Verification' },
  { id: 'accreditation', label: 'Accreditation Info' },
]

const content: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information We Collect',
        text: 'We collect information you provide directly to us, such as your name, email address, and performance data when you register and complete language assessments on the LEVELUP platform.',
      },
      {
        heading: 'How We Use Your Information',
        text: 'Your data is used solely to issue certificates, track your learning progress, and improve our assessment quality. We do not sell your personal information to third parties.',
      },
      {
        heading: 'Data Storage',
        text: 'All personal data is stored securely on servers located within Kazakhstan in compliance with the Law of the Republic of Kazakhstan on Personal Data and its Protection.',
      },
      {
        heading: 'Your Rights',
        text: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at inkonio@bk.ru.',
      },
      {
        heading: 'Contact',
        text: 'For any privacy-related inquiries, please reach out to our Data Protection Officer at inkonio@bk.ru or by calling +7 700 123 4567.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Acceptance of Terms',
        text: 'By accessing and using LEVELUP Institute\'s platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
      },
      {
        heading: 'Use of Platform',
        text: 'You may use our platform only for lawful purposes and in accordance with these terms. You agree not to attempt to gain unauthorized access to any part of the platform.',
      },
      {
        heading: 'Certificate Validity',
        text: 'Certificates issued by LEVELUP Institute are valid indefinitely from the date of issue. They represent your performance at the time of assessment and are non-transferable.',
      },
      {
        heading: 'Intellectual Property',
        text: 'All content on this platform, including course materials, assessments, and certificates, is the intellectual property of LEVELUP Institute and may not be reproduced without permission.',
      },
      {
        heading: 'Limitation of Liability',
        text: 'LEVELUP Institute shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or services.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    sections: [
      {
        heading: 'What Are Cookies',
        text: 'Cookies are small text files stored on your device when you visit our platform. They help us remember your preferences and improve your experience.',
      },
      {
        heading: 'Cookies We Use',
        text: 'We use essential cookies for authentication (keeping you logged in), and analytical cookies to understand how users interact with our platform. We do not use advertising cookies.',
      },
      {
        heading: 'Managing Cookies',
        text: 'You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the platform, including the ability to log in.',
      },
      {
        heading: 'Third-Party Cookies',
        text: 'We do not allow third-party services to place cookies on our platform. Your browsing data stays within LEVELUP Institute\'s systems only.',
      },
    ],
  },
  verification: {
    title: 'Certificate Verification',
    sections: [
      {
        heading: 'How to Verify',
        text: 'Every certificate issued by LEVELUP Institute contains a unique certificate ID. To verify a certificate, visit levelup.kz/verify and enter the certificate ID found at the bottom of the document.',
      },
      {
        heading: 'What Verification Confirms',
        text: 'Verification confirms the certificate holder\'s name, the course completed, the score achieved, and the date of issue. It also confirms the certificate has not been revoked.',
      },
      {
        heading: 'For Employers',
        text: 'Employers and institutions can verify any LEVELUP certificate by contacting us directly at inkonio@bk.ru with the certificate ID. We respond to verification requests within 1 business day.',
      },
      {
        heading: 'Certificate Authenticity',
        text: 'All certificates are digitally signed and recorded in our secure database. Any certificate that cannot be verified through our system should be considered invalid.',
      },
    ],
  },
  accreditation: {
    title: 'Accreditation Info',
    sections: [
      {
        heading: 'About LEVELUP Institute',
        text: 'LEVELUP Institute is a language certification authority based in Almaty, Kazakhstan. We provide standardized proficiency assessments aligned with the Common European Framework of Reference for Languages (CEFR).',
      },
      {
        heading: 'Our Standards',
        text: 'All assessments are developed by qualified language specialists and reviewed by academic advisors. Our B1, B2, A2, and B1 level certifications correspond directly to internationally recognized CEFR levels.',
      },
      {
        heading: 'Recognition',
        text: 'LEVELUP certificates are recognized by educational institutions and employers across Kazakhstan and Central Asia as valid proof of language proficiency.',
      },
      {
        heading: 'Academic Council',
        text: 'Our assessment framework is overseen by an Academic Council including Dr. A. Seitkali (Academic Director) and Prof. B. Nurmagambetov (Chief Examiner), ensuring the highest standards of evaluation.',
      },
      {
        heading: 'Contact',
        text: 'For accreditation inquiries or institutional partnerships, please contact us at inkonio@bk.ru or +7 700 123 4567. We are located in Almaty, Kazakhstan.',
      },
    ],
  },
}

export default function Legal() {
  const nav = useNavigate()
  const [active, setActive] = useState('privacy')
  const page = content[active]

  return (
    <div style={{ minHeight: '100vh', background: '#ECEAE3', fontFamily: 'Manrope, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <div style={{ borderBottom: '1px solid #D8D7D0', background: '#FAFAF7', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', color: '#777971', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>←</span> Back
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
          <div style={{ width: 80 }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 960, margin: '0 auto', width: '100%', padding: '48px 24px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>

        {/* Sidebar tabs */}
        <div style={{ width: 220, flexShrink: 0, position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: '#999890', textTransform: 'uppercase', marginBottom: 16 }}>Legal</div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '11px 16px',
                marginBottom: 4,
                background: active === tab.id ? '#1B3A6B' : 'transparent',
                color: active === tab.id ? 'white' : '#555550',
                border: 'none',
                fontSize: 13,
                fontWeight: active === tab.id ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'Manrope, sans-serif',
                transition: 'all .15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#171816', marginBottom: 8, letterSpacing: -0.5 }}>{page.title}</h1>
          <div style={{ fontSize: 12, color: '#999890', marginBottom: 40, fontFamily: 'DM Mono, monospace' }}>
            Last updated: 10 September 2026 · LEVELUP Institute
          </div>

          {page.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{
                fontSize: 14, fontWeight: 800, color: '#1B3A6B',
                marginBottom: 10,
                textTransform: 'uppercase', letterSpacing: 1
              }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: 14, color: '#4a4a48', lineHeight: 1.85 }}>{s.text}</p>
            </div>
          ))}

          <div style={{ marginTop: 48, padding: '24px', background: 'white', borderLeft: '3px solid #C8A84B' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#777971', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Questions?</div>
            <p style={{ fontSize: 13, color: '#4a4a48', lineHeight: 1.7 }}>
              Contact us at <strong>inkonio@bk.ru</strong> or <strong>+7 700 123 4567</strong>.<br />
              We are based in Almaty, Kazakhstan and respond within 1 business day.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #D8D7D0', background: '#FAFAF7', padding: '20px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#999890' }}>
          <span>© 2026 LEVELUP Institute. All rights reserved.</span>
          <span>levelup.kz</span>
        </div>
      </div>

    </div>
  )
}