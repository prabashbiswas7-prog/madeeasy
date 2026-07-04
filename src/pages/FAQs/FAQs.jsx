import { useState } from 'react'
import { faqs } from '../../data/faqs.js'
import './FAQs.css'

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="page-hero">
      <div className="container faqs-wrap">
        <span className="eyebrow">FAQs</span>
        <h1>Questions people usually ask.</h1>
        <p className="hero-sub">Can't find what you need? Message us directly on the Contact page.</p>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i
            return (
              <div className={`faq-item card ${isOpen ? 'is-open' : ''}`} key={f.q}>
                <button className="faq-question" onClick={() => setOpenIdx(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  {f.q}
                  <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq-answer">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
