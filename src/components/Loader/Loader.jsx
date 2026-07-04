import './Loader.css'

export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
