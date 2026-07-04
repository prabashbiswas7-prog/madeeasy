import { Link } from 'react-router-dom'
import { pricingFeatureOrder, pricingTiers } from '../../data/pricing.js'
import { icons } from '../icons.jsx'
import TrustBadge from '../TrustBadge/TrustBadge.jsx'
import './PricingTable.css'

export default function PricingTable() {
  return (
    <div className="pricing-table">
      <div className="pricing-cards">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className={`pricing-card card ${tier.recommended ? 'is-recommended' : ''}`}>
            {tier.recommended && (
              <div className="pricing-card-badge">
                <TrustBadge size={40} label="MOST BOOKED · " />
                <span>Most booked</span>
              </div>
            )}
            <h3>{tier.name}</h3>
            <p>{tier.description}</p>
            <div className="pricing-card-price">
              <span className="mono">{tier.priceLabel}</span>
              <span>{tier.priceNote}</span>
            </div>
            <ul className="pricing-card-list">
              {pricingFeatureOrder.map((feat) => (
                <li key={feat} className={tier.features[feat] ? 'is-yes' : 'is-no'}>
                  {tier.features[feat] ? icons.check() : icons.cross()}
                  {feat}
                </li>
              ))}
            </ul>
            <Link to="/services" className={`btn ${tier.recommended ? 'btn-primary' : 'btn-outline'} btn-block`}>
              Choose {tier.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="pricing-compare-wrap">
        <table className="pricing-compare">
          <thead>
            <tr>
              <th>Feature</th>
              {pricingTiers.map((t) => (
                <th key={t.id}>{t.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricingFeatureOrder.map((feat) => (
              <tr key={feat}>
                <td>{feat}</td>
                {pricingTiers.map((t) => (
                  <td key={t.id}>{t.features[feat] ? icons.check() : icons.cross()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
