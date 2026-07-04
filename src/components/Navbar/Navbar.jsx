import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="Made Easy" height="28" />
        </NavLink>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="navbar-actions-mobile">
            {user ? (
              <>
                <NavLink to="/account" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
                  My Account
                </NavLink>
                <button className="btn btn-primary btn-sm" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
                  Log in
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <div className="navbar-actions">
          <ThemeToggle />
          {user ? (
            <>
              <NavLink to="/account" className="btn btn-outline btn-sm">My Account</NavLink>
              <button className="btn btn-primary btn-sm" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline btn-sm">Log in</NavLink>
              <NavLink to="/signup" className="btn btn-primary btn-sm">Sign up</NavLink>
            </>
          )}
        </div>

        <button
          className="navbar-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
