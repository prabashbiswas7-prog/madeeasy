import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import './Account.css'

const emptyAddress = { label: '', line1: '', line2: '', city: '', state: '', pincode: '' }

export default function Account() {
  const { user, profile, refreshProfile } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddress, setNewAddress] = useState(emptyAddress)
  const [savingAddress, setSavingAddress] = useState(false)

  useEffect(() => {
    async function loadBookings() {
      if (!user) return
      try {
        const q = query(collection(db, 'bookings'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingBookings(false)
      }
    }
    loadBookings()
  }, [user])

  async function handleAddAddress(e) {
    e.preventDefault()
    if (!newAddress.line1 || !newAddress.city || !newAddress.pincode) return
    setSavingAddress(true)
    try {
      const updated = [...(profile?.addresses || []), { ...newAddress, label: newAddress.label || 'Address' }]
      await updateDoc(doc(db, 'users', user.uid), { addresses: updated })
      await refreshProfile()
      setNewAddress(emptyAddress)
      setShowAddForm(false)
    } finally {
      setSavingAddress(false)
    }
  }

  async function handleRemoveAddress(idx) {
    const updated = (profile?.addresses || []).filter((_, i) => i !== idx)
    await updateDoc(doc(db, 'users', user.uid), { addresses: updated })
    await refreshProfile()
  }

  return (
    <section className="page-hero">
      <div className="container account-grid">
        <div>
          <span className="eyebrow">My Account</span>
          <h1>Hi{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}.</h1>

          <div className="card account-section">
            <div className="account-section-head">
              <h3>Saved addresses</h3>
              <button className="btn btn-outline btn-sm" onClick={() => setShowAddForm((s) => !s)}>
                {showAddForm ? 'Cancel' : '+ Add address'}
              </button>
            </div>

            {showAddForm && (
              <form className="address-add-form" onSubmit={handleAddAddress}>
                <input placeholder="Label (Home, Office…)" value={newAddress.label} onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })} />
                <input placeholder="House / flat / street" value={newAddress.line1} onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })} />
                <input placeholder="Locality / landmark (optional)" value={newAddress.line2} onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })} />
                <div className="field-row">
                  <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                  <input placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                </div>
                <input placeholder="Pincode" maxLength={6} value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                <button className="btn btn-primary btn-sm" type="submit" disabled={savingAddress}>
                  {savingAddress ? 'Saving…' : 'Save address'}
                </button>
              </form>
            )}

            {profile?.addresses?.length ? (
              <ul className="address-list">
                {profile.addresses.map((a, i) => (
                  <li key={i}>
                    <div>
                      <strong>{a.label}</strong>
                      <span>{[a.line1, a.line2, a.city, a.state, a.pincode].filter(Boolean).join(', ')}</span>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => handleRemoveAddress(i)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              !showAddForm && <p className="field-hint">No saved addresses yet — add one so booking is faster next time.</p>
            )}
          </div>

          <div className="card account-section">
            <h3>Your bookings</h3>
            {loadingBookings ? (
              <Loader label="Loading bookings…" />
            ) : bookings.length ? (
              <ul className="booking-history">
                {bookings.map((b) => (
                  <li key={b.id}>
                    <div>
                      <strong>{b.serviceName}</strong>
                      <span>{b.subService} · {b.date} at {b.time}</span>
                    </div>
                    <span className="badge">{b.status === 'pending_whatsapp' ? 'Sent to WhatsApp' : b.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="field-hint">No bookings yet. Head to Services to book your first one.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
