import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../../data/services.js'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import TrustBadge from '../../components/TrustBadge/TrustBadge.jsx'
import { icons } from '../../components/icons.jsx'
import './Home.css'

const steps = [
  { n: '01', title: 'Sign up & add your address', text: 'Create an account once and save the addresses you book for most.' },
  { n: '02', title: 'Pick a service & schedule', text: 'Choose security, cleaning or home staff, then a date, time and any details.' },
  { n: '03', title: 'Confirm it on WhatsApp', text: 'We hand you straight to our team on WhatsApp to lock in the final details.' },
]

export default function Home() {
  const [pincode, setPincode] = useState('')
  const navigate = useNavigate()

  function handleStart(e) {
    e.preventDefault()
    navigate('/services')
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Verified staff · Booked in minutes</span>
            <h1>Security and home staff you can actually trust.</h1>
            <p className="hero-sub">
              Made Easy connects houses, societies and businesses with background-verified security guards,
              cleaners, cooks, drivers and caregivers — booked online, confirmed on WhatsApp.
            </p>

            <form className="hero-starter card" onSubmit={handleStart}>
              <div className="field" style={{ marginBottom: 0, flex: 1 }}>
                <label htmlFor="pincode">Your pincode</label>
                <input
                  id="pincode"
                  inputMode="numeric"
                  placeholder="e.g. 700001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button className="btn btn-primary" type="submit">See services</button>
            </form>

            <div className="hero-trust-strip">
              <TrustBadge size={54} />
              <div>
                <strong>Every staff member is background-verified</strong>
                <span>Identity checks and reference checks before anyone is listed.</span>
              </div>
            </div>
          </div>

          <div className="hero-panel card">
            <div className="hero-panel-row">
              <span className="badge">{icons.shield()} Security Guard</span>
              <span className="mono">₹14,000/mo</span>
            </div>
            <div className="hero-panel-row">
              <span className="badge">{icons.sparkle()} Housekeeping</span>
              <span className="mono">₹349/visit</span>
            </div>
            <div className="hero-panel-row">
              <span className="badge">{icons.chef()} Cook</span>
              <span className="mono">₹6,000/mo</span>
            </div>
            <div className="hero-panel-row">
              <span className="badge">{icons.wheel()} Driver</span>
              <span className="mono">₹12,000/mo</span>
            </div>
            <div className="hero-panel-footer">
              {icons.whatsapp()} Finalised over a real WhatsApp conversation — no bots.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our services</span>
            <h2>One platform for every kind of trusted staff.</h2>
          </div>
          <div className="grid grid-4">
            {services.slice(0, 4).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps, then a real conversation.</h2>
          </div>
          <div className="grid grid-3">
            {steps.map((s) => (
              <div className="card step-card" key={s.n}>
                <span className="step-number mono">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Ready to book someone you can trust?</h2>
            <p>Browse services, pick a slot, and we'll confirm every detail with you on WhatsApp.</p>
          </div>
          <a href="/services" className="btn btn-primary">Browse services</a>
        </div>
      </section>
    </>
  )
}
