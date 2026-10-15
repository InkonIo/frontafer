import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new URLSearchParams()
      form.append('username', email)
      form.append('password', password)
      const res = await axios.post('http://localhost:8000/api/auth/login', form)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/dashboard')
    } catch {
      setError('Неверный email или пароль')
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← LEVELUP</Link>
      <div className="auth-box">
        <div className="auth-logo">
          <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" fill="#1B3A6B"/>
            <path d="M8 28L19 10L30 28H8Z" fill="none" stroke="#C8A84B" strokeWidth="2.2" strokeLinejoin="round"/>
            <path d="M13 21.5H25" stroke="#C8A84B" strokeWidth="2"/>
            <circle cx="19" cy="10" r="2.5" fill="#C8FF55"/>
          </svg>
          <span>LEVELUP</span>
        </div>
        <h1>Войти в аккаунт</h1>
        <p className="auth-sub">Профессиональная платформа сертификации</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <button type="submit" disabled={loading}>{loading ? 'Входим...' : 'Войти'}</button>
        </form>
        <p className="auth-switch">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </div>
    </div>
  )
}