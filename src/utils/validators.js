export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, '').slice(-10))
}

export function isValidPincode(pincode) {
  return /^[0-9]{6}$/.test(pincode)
}
