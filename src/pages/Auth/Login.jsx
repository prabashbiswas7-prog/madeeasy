import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError('Could not log in. Check your email and password and try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-hero">
      <div className="container auth-wrap">
        <form className="card auth-card" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p className="hero-sub">Log in to book a service or manage your addresses.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>

          <p className="auth-switch">
            New to Made Easy? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
