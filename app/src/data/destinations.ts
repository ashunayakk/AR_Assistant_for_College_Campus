export type DestinationCategory =
  | 'Food'
  | 'Academic'
  | 'Admin'
  | 'Recreation'
  | 'Residential'
  | 'Utility'

export interface Destination {
  id: string
  name: string
  category: DestinationCategory
  description: string
  walkTimeMin: number
  distanceM: number
  steps: string[]
}

export const destinations: Destination[] = [
  {
    id: 'canteen',
    name: 'Canteen',
    category: 'Food',
    description: 'Main student canteen serving meals and snacks all day.',
    walkTimeMin: 3,
    distanceM: 180,
    steps: [
      'Exit the main entrance and turn right past the notice board.',
      'Walk straight along the covered walkway for 100 m.',
      'Turn left at the courtyard fountain.',
      'The canteen entrance is directly ahead, next to the vending machines.',
    ],
  },
  {
    id: 'library',
    name: 'Central Library',
    category: 'Academic',
    description: 'Four-storey library with study halls and the digital archive.',
    walkTimeMin: 5,
    distanceM: 320,
    steps: [
      'From the entrance, head straight through the main quad.',
      'Pass the Admin Block on your left.',
      'Continue toward the tall glass building ahead.',
      'The library entrance is on the ground floor, facing the quad.',
    ],
  },
  {
    id: 'admin-block',
    name: 'Administrative Block',
    category: 'Admin',
    description: 'Admissions, accounts, and the registrar’s office.',
    walkTimeMin: 4,
    distanceM: 250,
    steps: [
      'Enter the main quad and bear left toward the flagpole.',
      'Walk past the amphitheater steps.',
      'The Admin Block is the white building with the columned entrance.',
      'Reception is just inside the main doors.',
    ],
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    category: 'Recreation',
    description: 'Main auditorium for events, seminars, and cultural fests.',
    walkTimeMin: 6,
    distanceM: 400,
    steps: [
      'From the entrance, walk past the library on your right.',
      'Continue down the tree-lined path.',
      'Cross the small bridge over the campus pond.',
      'The auditorium is the domed building straight ahead.',
    ],
  },
  {
    id: 'cs-department',
    name: 'Computer Science Department',
    category: 'Academic',
    description: 'CS labs, faculty offices, and the innovation lab.',
    walkTimeMin: 5,
    distanceM: 300,
    steps: [
      'Head past the Admin Block and turn right at the sculpture garden.',
      'Walk up the ramp toward Block C.',
      'The CS Department is on the 2nd floor, Block C.',
      'Take the stairs or lift near the entrance lobby.',
    ],
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    category: 'Recreation',
    description: 'Indoor courts, gym, and the outdoor athletics ground.',
    walkTimeMin: 8,
    distanceM: 550,
    steps: [
      'Exit the main quad through the rear gate.',
      'Follow the path along the parking area.',
      'Continue straight past the hostel blocks.',
      'The sports complex gate is at the end of the path.',
    ],
  },
  {
    id: 'hostel',
    name: 'Hostel Blocks',
    category: 'Residential',
    description: 'Student residential blocks A through D.',
    walkTimeMin: 7,
    distanceM: 480,
    steps: [
      'From the entrance, head toward the rear gate.',
      'Turn left after the parking area.',
      'Walk past the sports complex on your right.',
      'Hostel blocks are ahead, marked A to D.',
    ],
  },
  {
    id: 'parking',
    name: 'Parking Area',
    category: 'Utility',
    description: 'Visitor and student parking for two- and four-wheelers.',
    walkTimeMin: 4,
    distanceM: 220,
    steps: [
      'From the entrance, turn right before the courtyard.',
      'Follow the boundary wall for 150 m.',
      'The parking area entrance is beside the security cabin.',
    ],
  },
  {
    id: 'health-center',
    name: 'Health Center',
    category: 'Utility',
    description: 'On-campus medical room with a resident nurse.',
    walkTimeMin: 3,
    distanceM: 150,
    steps: [
      'Enter the main quad and turn immediately right.',
      'The Health Center is the small building next to the Admin Block.',
      'Ring the bell at reception if the door is closed.',
    ],
  },
]

export function searchDestinations(query: string): Destination[] {
  const q = query.trim().toLowerCase()
  if (!q) return destinations
  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q),
  )
}
