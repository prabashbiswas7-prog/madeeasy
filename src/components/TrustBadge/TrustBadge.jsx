import './TrustBadge.css'

// The circular "seal" is Made Easy's signature visual — it stands in for the
// paperwork/verification trail behind every booking. Text runs along the
// circumference via <textPath>, a checkmark sits in the center.
export default function TrustBadge({ size = 88, label = 'VERIFIED · INSURED · MADE EASY ·' }) {
  const id = 'trust-badge-path'
  return (
    <svg className="trust-badge" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Verified and insured badge">
      <defs>
        <path id={id} d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="46" className="trust-badge-ring" />
      <circle cx="50" cy="50" r="30" className="trust-badge-fill" />
      <path d="M40 51 L47 58 L61 43" className="trust-badge-check" />
      <text dy="4">
        <textPath href={`#${id}`} startOffset="0%">
          {label.repeat(2)}
        </textPath>
      </text>
    </svg>
  )
}
