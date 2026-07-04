import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { getServiceBySlug } from '../../data/services.js'
import { buildWhatsAppLink } from '../../utils/whatsapp.js'
import { icons } from '../../components/icons.jsx'
import './Booking.css'

const emptyAddress = { label: '', line1: '', line2: '', city: '', state: '', pincode: '' }

export default function Booking() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const { user, profile, refreshProfile } = useAuth()

  const [addressMode, setAddressMode] = useState('saved') // 'saved' | 'new'
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0)
  const [newAddress, setNewAddress] = useState(emptyAddress)

  const [subService, setSubService] = useState(service?.subServices?.[0] || '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [frequency, setFrequency] = useState('One-time')
  const [notes, setNotes] = useState('')
  const [phone, setPhone] = useState(profile?.phone || '')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [waLink, setWaLink] = useState('')

  const hasSavedAddresses = profile?.addresses?.length > 0

  useEffect(() => {
    if (!hasSavedAddresses) setAddressMode('new')
  }, [hasSavedAddresses])

  if (!service) return <Navigate to="/services" replace />

  function formatAddress(a) {
    return [a.line1, a.line2, a.city, a.state, a.pincode].filter(Boolean).join(', ')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const addressText =
      addressMode === 'saved' && hasSavedAddresses
        ? formatAddress(profile.addresses[selectedAddressIdx])
        : formatAddress(newAddress)

    if (!addressText || !date || !time || !phone) {
      setError('Please fill in address, phone, date and time before continuing.')
      return
    }

    setSubmitting(true)
    try {
      const booking = {
        uid: user.uid,
        serviceSlug: service.slug,
        serviceName: service.name,
        subService,
        name: profile?.name || user.displayName || '',
        phone,
        address: addressText,
        date,
        time,
        frequency,
        notes,
        status: 'pending_whatsapp',
        createdAt: serverTimestamp(),
      }
      await addDoc(collection(db, 'bookings'), booking)

      // If the user typed a brand-new address, also save it to their profile for next time.
      if (addressMode === 'new' && newAddress.line1) {
        const updatedAddresses = [...(profile?.addresses || []), { ...newAddress, label: newAddress.label || 'Address' }]
        await updateDoc(doc(db, 'users', user.uid), { addresses: updatedAddresses })
        await refreshProfile()
      }

      setWaLink(buildWhatsAppLink(booking))
    } catch (err) {
      setError('Something went wrong saving your booking. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (waLink) {
    return (
      <section className="page-hero">
        <div className="container booking-success">
          <div className="card booking-success-card">
            <span className="badge">Booking details saved</span>
            <h1>One step left — confirm on WhatsApp</h1>
            <p>
              We've saved your request for <strong>{service.name}</strong>. Tap below to send it to our team on
              WhatsApp, where we'll confirm availability, final pricing and any last details.
            </p>
            <a className="btn btn-whatsapp btn-block" href={waLink} target="_blank" rel="noreferrer">
              {icons.whatsapp()} Continue on WhatsApp
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page-hero">
      <div className="container booking-grid">
        <form className="card booking-form" onSubmit={handleSubmit}>
          <span className="eyebrow">Book · {service.name}</span>
          <h1>Tell us what you need</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="field">
            <label htmlFor="subService">Type of {service.name.toLowerCase()}</label>
            <select id="subService" value={subService} onChange={(e) => setSubService(e.target.value)}>
              {service.subServices.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="phone">Contact phone number</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" />
          </div>

          <div className="field">
            <label>Address</label>
            {hasSavedAddresses && (
              <div className="address-toggle">
                <button type="button" className={addressMode === 'saved' ? 'is-active' : ''} onClick={() => setAddressMode('saved')}>
                  Saved address
                </button>
                <button type="button" className={addressMode === 'new' ? 'is-active' : ''} onClick={() => setAddressMode('new')}>
                  New address
                </button>
              </div>
            )}

            {addressMode === 'saved' && hasSavedAddresses ? (
              <select value={selectedAddressIdx} onChange={(e) => setSelectedAddressIdx(Number(e.target.value))}>
                {profile.addresses.map((a, i) => (
                  <option key={i} value={i}>{a.label || 'Address'} — {formatAddress(a)}</option>
                ))}
              </select>
            ) : (
              <div className="address-fields">
                <input
                  placeholder="Label (Home, Office…)"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                />
                <input
                  placeholder="House / flat / street"
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                />
                <input
                  placeholder="Locality / landmark (optional)"
                  value={newAddress.line2}
                  onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                />
                <div className="field-row">
                  <input
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                  <input
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  />
                </div>
                <input
                  placeholder="Pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="time">Time</label>
              <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="frequency">Frequency</label>
            <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option>One-time</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="notes">Anything else we should know?</label>
            <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gate code, preferred gender, specific requirements…" />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Continue to WhatsApp'}
          </button>
        </form>
      </div>
    </section>
  )
}
