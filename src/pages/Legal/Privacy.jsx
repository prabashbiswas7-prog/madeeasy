import './Legal.css'

export default function Privacy() {
  return (
    <section className="page-hero">
      <div className="container legal-wrap">
        <span className="eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <span className="legal-updated">Last updated: [add date before launch]</span>

        <p>
          This policy explains what information Made Easy collects when you use this website, and how
          it is used. This is a starting template — have it reviewed by a lawyer before you launch,
          since requirements vary by state and by how you actually handle data in practice.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Account details: name, email address, phone number.</li>
          <li>Addresses you save or enter for a booking.</li>
          <li>Booking details: service selected, date, time, frequency, and any notes you add.</li>
        </ul>

        <h2>How we use this information</h2>
        <ul>
          <li>To create and manage your account.</li>
          <li>To process and confirm bookings, including sharing relevant booking details with our team over WhatsApp to finalise your request.</li>
          <li>To contact you about a booking or account issue.</li>
        </ul>

        <h2>Sharing with third parties</h2>
        <p>
          Booking details are shared with the staff member or agency assigned to fulfil your request,
          to the extent needed to carry out the service. We do not sell personal information to
          advertisers or data brokers.
        </p>

        <h2>Data storage</h2>
        <p>
          Account and booking data is stored using Firebase (Google Cloud) infrastructure. We retain
          this data for as long as your account is active, or as needed to resolve disputes and comply
          with legal obligations.
        </p>

        <h2>Your choices</h2>
        <p>
          You can update your saved addresses and details from My Account at any time. To request
          deletion of your account and associated data, contact us using the details on the Contact page.
        </p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to the email address listed on our Contact page.</p>
      </div>
    </section>
  )
}
