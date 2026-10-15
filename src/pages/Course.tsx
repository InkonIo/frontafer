import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const COURSES: Record<string, { title: string; lang: string; level: string; questions: { q: string; opts: string[]; ans: number }[] }> = {
  'english-b1': {
    title: 'English for Educators', lang: 'EN', level: 'B1',
    questions: [
      { q: 'Choose the correct form: "She ___ to school every day."', opts: ['go', 'goes', 'going', 'gone'], ans: 1 },
      { q: 'What is the past tense of "teach"?', opts: ['teached', 'tought', 'taught', 'teaching'], ans: 2 },
      { q: 'Select the correct sentence:', opts: ['He don\'t like coffee.', 'He doesn\'t likes coffee.', 'He doesn\'t like coffee.', 'He not like coffee.'], ans: 2 },
      { q: '"Curriculum" means:', opts: ['A school building', 'A set of courses', 'A type of exam', 'A teaching method'], ans: 1 },
      { q: 'Choose the right preposition: "She is good ___ mathematics."', opts: ['in', 'on', 'at', 'for'], ans: 2 },
      { q: 'Which word is a synonym for "intelligent"?', opts: ['Lazy', 'Smart', 'Tired', 'Slow'], ans: 1 },
      { q: '"Students should ___ their homework on time."', opts: ['submits', 'submit', 'submitted', 'submitting'], ans: 1 },
      { q: 'What does "assess" mean?', opts: ['To ignore', 'To evaluate', 'To reward', 'To punish'], ans: 1 },
      { q: 'Correct plural of "syllabus":', opts: ['syllabuses', 'syllabus', 'syllabi', 'Both A and C'], ans: 3 },
      { q: '"The lesson ___ at 9 AM tomorrow." (scheduled)', opts: ['starts', 'start', 'started', 'starting'], ans: 0 },
    ]
  },
  'english-b2': {
    title: 'Advanced English', lang: 'EN', level: 'B2',
    questions: [
      { q: 'Which sentence uses the subjunctive correctly?', opts: ['I suggest that he goes home.', 'I suggest that he go home.', 'I suggest that he going home.', 'I suggest that he gone home.'], ans: 1 },
      { q: '"Pedantic" most closely means:', opts: ['Creative', 'Overly concerned with rules', 'Enthusiastic', 'Disorganised'], ans: 1 },
      { q: 'Identify the passive construction:', opts: ['She wrote the report.', 'The report was written by her.', 'She had written the report.', 'Writing the report was her task.'], ans: 1 },
      { q: 'Which is an example of a non-defining relative clause?', opts: ['The book that I read was great.', 'The book, which I read last night, was great.', 'That is the book I need.', 'Give me the book you have.'], ans: 1 },
      { q: '"Despite ___ hard, he failed the exam."', opts: ['study', 'studied', 'studying', 'to study'], ans: 2 },
      { q: 'What rhetorical device is used in "The pen is mightier than the sword"?', opts: ['Simile', 'Metaphor', 'Alliteration', 'Hyperbole'], ans: 1 },
      { q: 'Choose the correct conditional: "If I ___ you, I would apologise."', opts: ['am', 'was', 'were', 'be'], ans: 2 },
      { q: '"Ephemeral" means:', opts: ['Long-lasting', 'Short-lived', 'Colourful', 'Logical'], ans: 1 },
      { q: 'Which word correctly completes: "The committee ___ its decision."', opts: ['have reached', 'has reached', 'are reaching', 'reach'], ans: 1 },
      { q: 'Identify the gerund phrase in: "Running every morning keeps him fit."', opts: ['keeps him fit', 'every morning', 'Running every morning', 'him fit'], ans: 2 },
    ]
  },
  'german-a2': {
    title: 'Deutsch für Anfänger', lang: 'DE', level: 'A2',
    questions: [
      { q: 'Was ist der Artikel für "Buch"?', opts: ['der', 'die', 'das', 'kein Artikel'], ans: 2 },
      { q: '"Ich ___ aus Kasachstan." — richtige Form von "kommen":', opts: ['komme', 'kommst', 'kommt', 'kommen'], ans: 0 },
      { q: 'Wie sagt man "I have a dog" auf Deutsch?', opts: ['Ich habe ein Hund.', 'Ich habe einen Hund.', 'Ich habe einem Hund.', 'Ich habe eines Hundes.'], ans: 1 },
      { q: 'Welche Zahl ist "achtzehn"?', opts: ['8', '80', '18', '28'], ans: 2 },
      { q: '"Morgen ___ ich ins Kino." (gehen)', opts: ['gehe', 'gehst', 'geht', 'gehen'], ans: 0 },
      { q: 'Was bedeutet "Entschuldigung"?', opts: ['Thank you', 'Excuse me', 'Good morning', 'Please'], ans: 1 },
      { q: 'Wo ist die Bibliothek? — "Die Bibliothek ist ___ der Schule."', opts: ['in', 'neben', 'auf', 'unter'], ans: 1 },
      { q: 'Richtige Verneinung: "Ich trinke ___ Kaffee."', opts: ['nicht', 'kein', 'keine', 'nein'], ans: 1 },
      { q: '"Wie viel Uhr ist es?" — "Es ist halb drei." Was bedeutet das?', opts: ['3:00', '2:30', '3:30', '2:00'], ans: 1 },
      { q: 'Welches Wort ist ein Adjektiv?', opts: ['laufen', 'schnell', 'Haus', 'und'], ans: 1 },
    ]
  },
  'german-b1': {
    title: 'Deutsch Mittelstufe', lang: 'DE', level: 'B1',
    questions: [
      { q: '"Obwohl es regnete, ___ wir spazieren." — richtiges Verb:', opts: ['gingen', 'gehen', 'ging', 'gegangen'], ans: 0 },
      { q: 'Was ist der Genitiv von "der Mann"?', opts: ['den Mann', 'dem Mann', 'des Mannes', 'die Männer'], ans: 2 },
      { q: 'Konjunktiv II: "Wenn ich Zeit ___, würde ich reisen."', opts: ['habe', 'hätte', 'hatte', 'gehabt'], ans: 1 },
      { q: '"Das Buch, ___ ich lese, ist interessant." — Relativpronomen:', opts: ['der', 'die', 'das', 'dem'], ans: 2 },
      { q: 'Passiv: "Die Hausaufgaben ___ von den Schülern gemacht."', opts: ['werden', 'wird', 'wurden', 'worden'], ans: 2 },
      { q: 'Was bedeutet "Gleichberechtigung"?', opts: ['Education', 'Equal rights', 'Environment', 'Government'], ans: 1 },
      { q: '"Trotz ___ Wetters gingen wir raus." — Kasus:', opts: ['des schlechten', 'dem schlechten', 'den schlechten', 'das schlechte'], ans: 0 },
      { q: 'Welche Präposition nimmt den Dativ?', opts: ['durch', 'für', 'mit', 'gegen'], ans: 2 },
      { q: '"Er behauptet, er ___ krank." — Indirekte Rede:', opts: ['ist', 'sei', 'war', 'wäre'], ans: 1 },
      { q: 'Bedeutung von "nachhaltig":',  opts: ['Fast', 'Sustainable', 'Surprising', 'Difficult'], ans: 1 },
    ]
  }
}

export default function Course() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = id ? COURSES[id] : null

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) nav('/login')
  }, [])

  if (!course) return (
    <div style={{ padding: 60, fontFamily: 'Manrope, sans-serif', textAlign: 'center' }}>
      <h2>Course not found</h2>
      <button onClick={() => nav('/dashboard')} style={{ marginTop: 20, padding: '10px 24px', cursor: 'pointer' }}>← Back</button>
    </div>
  )

  const q = course.questions[current]
  const total = course.questions.length

  const pick = (i: number) => {
    if (submitted) return
    setSelected(i)
    const upd = [...answers]
    upd[current] = i
    setAnswers(upd)
  }

  const next = () => {
    if (current < total - 1) { setCurrent(current + 1); setSelected(answers[current + 1]) }
  }
  const prev = () => {
    if (current > 0) { setCurrent(current - 1); setSelected(answers[current - 1]) }
  }

  const submit = async () => {
    const score = answers.filter((a, i) => a === course.questions[i].ans).length * 10
    const token = localStorage.getItem('token')
    setSubmitting(true)
    try {
      await axios.post('http://localhost:8000/api/certificates/', {
        course_id: id,
        course_name: course.title,
        score
      }, { headers: { Authorization: `Bearer ${token}` } })
    } catch (e) {}
    setSubmitting(false)
    setSubmitted(true)
  }

  const score = answers.filter((a, i) => a === course.questions[i].ans).length * 10

  if (submitted) {
    const passed = score >= 60
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{passed ? '🎓' : '📚'}</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2, marginBottom: 8 }}>{score}/100</h1>
          <p style={{ fontSize: 18, color: '#777971', marginBottom: 32 }}>
            {passed ? `Excellent! You passed ${course.title}.` : `Keep studying! You need 60+ to pass.`}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {passed && (
              <button onClick={() => nav('/dashboard')} style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                View Certificate →
              </button>
            )}
            <button onClick={() => nav('/dashboard')} style={{ background: 'none', border: '2px solid #171816', color: '#171816', padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E4E4DF', background: '#FAFAF7', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => nav('/dashboard')} style={{ background: 'none', border: 'none', fontSize: 14, cursor: 'pointer', color: '#777971', fontFamily: 'Manrope, sans-serif' }}>← Dashboard</button>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: '#777971' }}>
            <span style={{ background: course.lang === 'EN' ? '#1B3A6B' : '#C8A84B', color: 'white', padding: '3px 8px', fontSize: 11, marginRight: 8 }}>{course.lang}</span>
            {course.level} · {course.title}
          </span>
          <span style={{ fontSize: 13, color: '#777971', fontFamily: 'DM Mono, monospace' }}>{current + 1}/{total}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: '#E4E4DF' }}>
        <div style={{ height: '100%', background: '#C8FF55', width: `${((current + 1) / total) * 100}%`, transition: 'width .3s' }} />
      </div>

      {/* Question */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#777971', marginBottom: 20, textTransform: 'uppercase', fontFamily: 'DM Mono, monospace' }}>
          Question {current + 1}
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.3, marginBottom: 36, color: '#171816' }}>{q.q}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.opts.map((opt, i) => {
            const isSel = selected === i
            return (
              <button key={i} onClick={() => pick(i)} style={{
                padding: '16px 20px', textAlign: 'left', fontSize: 15, fontWeight: isSel ? 700 : 500,
                background: isSel ? '#171816' : 'white', color: isSel ? '#FAFAF7' : '#171816',
                border: isSel ? '2px solid #171816' : '2px solid #E4E4DF',
                cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 12
              }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', border: isSel ? '2px solid #C8FF55' : '2px solid #ccc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, background: isSel ? '#C8FF55' : 'transparent', color: '#171816' }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, alignItems: 'center' }}>
          <button onClick={prev} disabled={current === 0} style={{ background: 'none', border: '2px solid #E4E4DF', padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: current === 0 ? 'default' : 'pointer', opacity: current === 0 ? 0.4 : 1, fontFamily: 'Manrope, sans-serif' }}>← Prev</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {course.questions.map((_, i) => (
              <div key={i} onClick={() => { setCurrent(i); setSelected(answers[i]) }} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#171816' : answers[i] !== null ? '#C8FF55' : '#E4E4DF', cursor: 'pointer', transition: 'background .2s' }} />
            ))}
          </div>
          {current < total - 1
            ? <button onClick={next} style={{ background: '#171816', color: 'white', border: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>Next →</button>
            : <button onClick={submit} disabled={submitting || answers.some(a => a === null)} style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', opacity: answers.some(a => a === null) ? 0.5 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}