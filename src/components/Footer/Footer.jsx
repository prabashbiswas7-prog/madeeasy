import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="Made Easy" height="26" />
          <p>Verified security guards, cleaners and home staff — booked in minutes, confirmed on WhatsApp.</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faqs">FAQs</Link>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/services">All services</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Made Easy. All rights reserved.</span>
      </div>
    </footer>
  )
}
