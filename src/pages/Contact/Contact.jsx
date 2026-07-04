import { icons } from '../../components/icons.jsx'
import './Contact.css'

export default function Contact() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL
  const supportPhone = import.meta.env.VITE_SUPPORT_PHONE

  return (
    <section className="page-hero">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Contact us</span>
          <h1>Talk to a real person, not a form.</h1>
          <p className="hero-sub">
            For a new booking, the fastest path is picking a service and letting the booking form
            hand you off to WhatsApp. For anything else — a question, feedback, or a partnership
            enquiry — reach us directly below.
          </p>

          <div className="contact-details">
            <div className="contact-row card">
              <span className="contact-icon">{icons.whatsapp()}</span>
              <div>
                <strong>WhatsApp</strong>
                <span>+{whatsappNumber}</span>
              </div>
            </div>
            <div className="contact-row card">
              <span className="contact-icon">✉</span>
              <div>
                <strong>Email</strong>
                <span>{supportEmail}</span>
              </div>
            </div>
            <div className="contact-row card">
              <span className="contact-icon">☎</span>
              <div>
                <strong>Phone</strong>
                <span>{supportPhone}</span>
              </div>
            </div>
          </div>

          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            {icons.whatsapp()} Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
