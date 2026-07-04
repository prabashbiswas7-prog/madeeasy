import PricingTable from '../../components/PricingTable/PricingTable.jsx'

export default function Pricing() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">Pricing</span>
        <h1>Simple tiers, transparent features.</h1>
        <p className="hero-sub">
          Prices vary by service and city — the numbers below are starting points. Every plan is
          finalised and confirmed with our team on WhatsApp before anything is booked.
        </p>
        <div style={{ marginTop: 40 }}>
          <PricingTable />
        </div>
      </div>
    </section>
  )
}
