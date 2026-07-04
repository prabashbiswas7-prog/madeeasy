import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This page didn't make it onto the list.</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </section>
  )
}
