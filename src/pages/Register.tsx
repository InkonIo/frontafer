import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Auth.css'

export default function Register() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [role, setRole] = useState('educator')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', { name, email, password, city, role })
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/dashboard')
    } catch {
      setError('Email уже зарегистрирован')
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
        <h1>Создать аккаунт</h1>
        <p className="auth-sub">Присоединяйтесь к программе сертификации</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submit}>
          <label>Полное имя</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Eldana Abdykalik" required />
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          <label>Город</label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Алматы" required />
          <label>Статус</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="educator">Преподаватель</option>
            <option value="student">Студент</option>
            <option value="staff">Сотрудник</option>
          </select>
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="минимум 8 символов" required />
          <button type="submit" disabled={loading}>{loading ? 'Создаём...' : 'Зарегистрироваться'}</button>
        </form>
        <p className="auth-switch">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  )
}