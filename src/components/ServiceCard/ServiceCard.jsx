import { Link } from 'react-router-dom'
import TrustBadge from '../TrustBadge/TrustBadge.jsx'
import { icons } from '../icons.jsx'
import './ServiceCard.css'

export default function ServiceCard({ service }) {
  const Icon = icons[service.icon]
  return (
    <Link to={`/services/${service.slug}`} className="service-card card">
      <div className="service-card-top">
        <div className="service-card-icon">{Icon && <Icon />}</div>
        <TrustBadge size={44} />
      </div>
      <h3>{service.name}</h3>
      <p>{service.tagline}</p>
      <div className="service-card-price">
        {service.startingPrice > 0 ? (
          <>
            <span className="mono">From ₹{service.startingPrice.toLocaleString('en-IN')}</span>
            <span className="service-card-unit">{service.unit}</span>
          </>
        ) : (
          <span className="mono">Custom quote</span>
        )}
      </div>
    </Link>
  )
}
