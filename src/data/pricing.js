export const pricingTiers = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For a single service, single shift.',
    priceLabel: 'From ₹349',
    priceNote: 'per visit / varies by service',
    recommended: false,
    features: {
      'Verified staff': true,
      'Replacement on leave': false,
      'Dedicated coordinator': false,
      'Consolidated monthly billing': false,
      'Priority scheduling': false,
      'Custom shift planning': false,
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'For an ongoing monthly booking, one service.',
    priceLabel: 'From ₹6,000',
    priceNote: 'per month, per person',
    recommended: true,
    features: {
      'Verified staff': true,
      'Replacement on leave': true,
      'Dedicated coordinator': false,
      'Consolidated monthly billing': false,
      'Priority scheduling': true,
      'Custom shift planning': false,
    },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'For offices bundling multiple services and staff.',
    priceLabel: 'Custom quote',
    priceNote: 'based on headcount & services',
    recommended: false,
    features: {
      'Verified staff': true,
      'Replacement on leave': true,
      'Dedicated coordinator': true,
      'Consolidated monthly billing': true,
      'Priority scheduling': true,
      'Custom shift planning': true,
    },
  },
]

export const pricingFeatureOrder = [
  'Verified staff',
  'Replacement on leave',
  'Dedicated coordinator',
  'Consolidated monthly billing',
  'Priority scheduling',
  'Custom shift planning',
]
