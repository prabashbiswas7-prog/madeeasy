import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { isValidEmail, isValidPhone } from '../../utils/validators.js'
import './Auth.css'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('Please enter your name.')
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (!isValidPhone(phone)) return setError('Please enter a valid 10-digit phone number.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')

    setSubmitting(true)
    try {
      await signup({ name, email, phone, password })
      navigate('/account', { replace: true })
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account already exists with this email. Try logging in instead.')
      } else {
        setError('Could not create your account. Please try again.')
      }
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-hero">
      <div className="container auth-wrap">
        <form className="card auth-card" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="hero-sub">Save your addresses once, book in seconds every time after.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="field-hint">At least 6 characters.</span>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
