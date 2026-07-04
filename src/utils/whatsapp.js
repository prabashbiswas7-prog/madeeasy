export function buildWhatsAppLink(booking) {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER
  const lines = [
    '*New booking request — Made Easy*',
    '',
    `*Service:* ${booking.serviceName}${booking.subService ? ` (${booking.subService})` : ''}`,
    `*Name:* ${booking.name}`,
    `*Phone:* ${booking.phone}`,
    `*Address:* ${booking.address}`,
    `*Date:* ${booking.date}`,
    `*Time:* ${booking.time}`,
    `*Frequency:* ${booking.frequency}`,
  ]
  if (booking.notes) {
    lines.push(`*Notes:* ${booking.notes}`)
  }
  lines.push('', '_Sent from madeeasy website_')

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${number}?text=${text}`
}
