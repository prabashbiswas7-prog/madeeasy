import TrustBadge from '../../components/TrustBadge/TrustBadge.jsx'
import './About.css'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About Made Easy</span>
          <h1>Trusted help, made simple.</h1>
          <p className="hero-sub">
            Made Easy exists because finding a security guard, a cleaner, or reliable household help
            usually means asking around, hoping for the best, and starting over when it doesn't work out.
            We built a single place to find verified people for the work that keeps a home or business running.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <h2>What we do</h2>
            <p>
              We work with security agencies and independent staff across categories — security guards,
              housekeeping, cooking, driving, childcare and elderly care — and put them behind one simple
              booking flow. You tell us what you need and when; we confirm the rest over WhatsApp with a
              real person on our team.
            </p>
            <h2>Why verification matters</h2>
            <p>
              Every person listed through Made Easy goes through an identity check and reference check
              before they're eligible to be booked. For security roles, this includes a police verification
              check. We treat this as non-negotiable, not a marketing line.
            </p>
          </div>
          <div className="about-badge-card card">
            <TrustBadge size={100} />
            <h3>Verified & accountable</h3>
            <p>Identity checks, reference checks and a real conversation before anyone starts work at your home or office.</p>
          </div>
        </div>
      </section>
    </>
  )
}
