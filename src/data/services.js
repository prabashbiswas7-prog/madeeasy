// Central service catalog. Add a new service by adding one object here —
// the Services list, single service pages, and booking dropdown all read from this file.

export const services = [
  {
    slug: 'security-guard',
    name: 'Security Guard',
    tagline: 'Trained, verified guards for homes, gates and offices',
    icon: 'shield',
    shortDescription:
      'Background-checked security personnel for residential gates, corporate premises, warehouses and events.',
    description:
      'Every guard on the Made Easy network is background-verified, uniformed and trained in basic access control, visitor logging and emergency response. Choose day, night or round-the-clock coverage for homes, societies, offices or one-off events.',
    features: [
      'Police-verified background check',
      'Uniform and ID badge provided',
      'Visitor log and gate register',
      'Day, night and 24-hour shifts',
      'Replacement guard on leave, at no extra cost',
    ],
    subServices: ['Residential gate duty', 'Corporate/office security', 'Warehouse & godown', 'Event security'],
    startingPrice: 14000,
    unit: 'per guard / month',
    category: 'security',
  },
  {
    slug: 'housekeeping',
    name: 'Housekeeping & Cleaning',
    tagline: 'Regular or one-time deep cleaning for homes and offices',
    icon: 'sparkle',
    shortDescription:
      'Trained cleaning staff for daily housekeeping, move-in/move-out deep cleans, and office maintenance.',
    description:
      'From daily sweeping and mopping to a full deep clean before a move, our housekeeping staff are trained, background-checked and equipped with their own cleaning kits. Book a one-time visit or a recurring weekly plan.',
    features: [
      'One-time or recurring visits',
      'Own cleaning equipment and supplies (or use yours)',
      'Kitchen, bathroom & floor deep cleaning',
      'Office and common-area maintenance',
      'Background-verified staff',
    ],
    subServices: ['Daily housekeeping', 'Deep cleaning', 'Move-in / move-out cleaning', 'Office cleaning'],
    startingPrice: 349,
    unit: 'per visit',
    category: 'home',
  },
  {
    slug: 'cook',
    name: 'Cook / Chef',
    tagline: 'Home-style or professional cooking, daily or on demand',
    icon: 'chef',
    shortDescription: 'Experienced cooks for daily home meals, tiffin services, and small events.',
    description:
      'Hire a cook for daily meal preparation at home, a specific cuisine for a special occasion, or ongoing tiffin-style service for your family or PG. All cooks are interviewed and reference-checked before onboarding.',
    features: [
      'North Indian, South Indian, Bengali & Continental options',
      'Daily, alternate-day or event-based booking',
      'Grocery-assist available on request',
      'Reference-checked staff',
    ],
    subServices: ['Daily home cooking', 'Event / party cooking', 'Tiffin service'],
    startingPrice: 6000,
    unit: 'per month',
    category: 'home',
  },
  {
    slug: 'driver',
    name: 'Driver',
    tagline: 'Verified drivers for daily commute, outstation or full-time',
    icon: 'wheel',
    shortDescription: 'Licensed, verified drivers for daily office commute, outstation trips or full-time hire.',
    description:
      'All Made Easy drivers hold a valid commercial license, are background-verified and trained in defensive driving. Book by the month for a daily commute, or on-demand for an outstation trip.',
    features: [
      'Valid commercial license, verified',
      'Familiar with manual and automatic vehicles',
      'Full-time, part-time or outstation booking',
      'Background-verified',
    ],
    subServices: ['Full-time driver', 'Part-time / commute driver', 'Outstation trip'],
    startingPrice: 12000,
    unit: 'per month',
    category: 'home',
  },
  {
    slug: 'nanny-babysitter',
    name: 'Nanny / Babysitter',
    tagline: 'Caring, background-checked childcare support',
    icon: 'heart',
    shortDescription: 'Trained caregivers for infants and young children, full-time or on-call.',
    description:
      'Our nannies and babysitters are interviewed, reference-checked and screened for prior childcare experience. Book full-time live-out support or an on-call babysitter for an evening out.',
    features: [
      'Prior childcare experience verified',
      'Full-time or on-call booking',
      'Basic first-aid awareness',
      'Reference-checked',
    ],
    subServices: ['Full-time nanny', 'On-call babysitting', 'Infant care'],
    startingPrice: 9000,
    unit: 'per month',
    category: 'home',
  },
  {
    slug: 'elderly-care',
    name: 'Elderly Care Attendant',
    tagline: 'Compassionate, trained attendants for senior care at home',
    icon: 'heart-pulse',
    shortDescription: 'Trained attendants for daily assistance, mobility support and companionship for seniors.',
    description:
      'Elderly care attendants assist with daily routines, mobility, medication reminders and companionship. Suitable for full-time live-in support or day-shift assistance.',
    features: [
      'Trained in basic elderly care and mobility support',
      'Medication reminders',
      'Full-time or day-shift options',
      'Background-verified',
    ],
    subServices: ['Full-time attendant', 'Day-shift attendant', 'Post-surgery care support'],
    startingPrice: 15000,
    unit: 'per month',
    category: 'home',
  },
  {
    slug: 'corporate-staffing',
    name: 'Corporate Facility Staffing',
    tagline: 'Bulk security and housekeeping staff for offices & business parks',
    icon: 'building',
    shortDescription: 'Combined security, housekeeping and office-support staffing for businesses, at scale.',
    description:
      'A single point of contact for all your facility staffing — security guards, housekeeping and office support staff — with consolidated billing and a dedicated account coordinator for offices, business parks and retail spaces.',
    features: [
      'Combined security + housekeeping contracts',
      'Consolidated monthly billing',
      'Dedicated account coordinator',
      'Custom shift planning',
    ],
    subServices: ['Office security + housekeeping bundle', 'Retail/mall staffing', 'Business park facility staff'],
    startingPrice: 0,
    unit: 'custom quote',
    category: 'corporate',
  },
]

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug)
}
