import { Link, Navigate, useParams } from 'react-router-dom'
import { getServiceBySlug } from '../../data/services.js'
import { icons } from '../../components/icons.jsx'
import TrustBadge from '../../components/TrustBadge/TrustBadge.jsx'
import './ServiceDetail.css'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to="/services" replace />

  const Icon = icons[service.icon]

  return (
    <section className="page-hero">
      <div className="container service-detail-grid">
        <div>
          <Link to="/services" className="back-link">← All services</Link>
          <div className="service-detail-icon">{Icon && <Icon />}</div>
          <h1>{service.name}</h1>
          <p className="hero-sub">{service.description}</p>

          <h3>What's included</h3>
          <ul className="feature-list">
            {service.features.map((f) => (
              <li key={f}>{icons.check()} {f}</li>
            ))}
          </ul>

          <h3>Available for</h3>
          <div className="sub-service-chips">
            {service.subServices.map((s) => (
              <span key={s} className="badge">{s}</span>
            ))}
          </div>
        </div>

        <aside className="service-detail-panel card">
          <TrustBadge size={64} />
          <div className="service-detail-price">
            {service.startingPrice > 0 ? (
              <>
                <span className="mono">₹{service.startingPrice.toLocaleString('en-IN')}</span>
                <span>{service.unit}, starting price</span>
              </>
            ) : (
              <>
                <span className="mono">Custom quote</span>
                <span>Based on your requirement</span>
              </>
            )}
          </div>
          <Link to={`/book/${service.slug}`} className="btn btn-primary btn-block">Book now</Link>
          <p className="field-hint" style={{ textAlign: 'center', marginTop: 10 }}>
            You'll confirm final pricing and availability on WhatsApp.
          </p>
        </aside>
      </div>
    </section>
  )
}
