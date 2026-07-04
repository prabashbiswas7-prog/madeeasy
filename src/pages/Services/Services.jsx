import { useMemo, useState } from 'react'
import { services } from '../../data/services.js'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import './Services.css'

const categories = [
  { id: 'all', label: 'All services' },
  { id: 'security', label: 'Security' },
  { id: 'home', label: 'Home & family' },
  { id: 'corporate', label: 'Corporate' },
]

export default function Services() {
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? services : services.filter((s) => s.category === active)),
    [active]
  )

  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">Services</span>
        <h1>Choose what you need.</h1>
        <p className="hero-sub">Every listing below is background-verified. Pick one to see full details and book.</p>

        <div className="services-filters">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-chip ${active === c.id ? 'is-active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-4">
          {filtered.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
