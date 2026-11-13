export const brand = {
  name: 'Jussy',
  mark: 'J.',
  tagline: 'Jus segar, diperas alami.',
  email: 'hello@jussy.id',
  year: 2026,
}

export const nav = [
  { label: 'Produk', href: '#produk' },
  { label: 'Cerita', href: '#cerita' },
  { label: 'Nilai', href: '#nilai' },
  { label: 'Kontak', href: '#kontak' },
]

export type Flavor = {
  name: string
  tag: string
  note: string
  color: string
  colorHi: string
  colorDark: string
}

export type Scene = {
  id: string
  kicker: string
  title: string
  script: string
  description: string
  bg: string
  ink: string
  accent: string
  items: Flavor[]
}

export const scenes: Scene[] = [
  {
    id: 'signature-juice',
    kicker: '01 — Jus murni',
    title: 'Signature Juice',
    script: 'diperas segar',
    description:
      'Satu buah pilihan, diperas dingin tanpa tambahan gula. Rasanya jujur dan ringan — seperti memetik buah langsung dari kebun.',
    bg: '#ef7442',
    ink: '#2a1108',
    accent: '#ffe7d6',
    items: [
      {
        name: 'Mangga',
        tag: 'Cold-pressed',
        note: 'Manis tropis',
        color: '#ffb02e',
        colorHi: '#ffd97a',
        colorDark: '#d97a10',
      },
      {
        name: 'Jeruk',
        tag: 'Cold-pressed',
        note: 'Segar asam',
        color: '#ff9a1f',
        colorHi: '#ffc266',
        colorDark: '#c96a00',
      },
      {
        name: 'Stroberi',
        tag: 'Tanpa gula',
        note: 'Manis lembut',
        color: '#f2445c',
        colorHi: '#ff8fa0',
        colorDark: '#b81f3b',
      },
      {
        name: 'Nanas',
        tag: 'Cold-pressed',
        note: 'Tropis cerah',
        color: '#f5d33f',
        colorHi: '#fff09a',
        colorDark: '#c9a600',
      },
    ],
  },
  {
    id: 'berry-blend',
    kicker: '02 — Campuran beri',
    title: 'Berry Blend',
    script: 'merah & biru',
    description:
      'Raspberry, blueberry, dan cranberry diblender bersama sampai halus. Asam segar yang berani, tanpa perasa atau pewarna buatan.',
    bg: '#a83e6d',
    ink: '#2a0d1e',
    accent: '#ffe0ef',
    items: [
      {
        name: 'Raspberry',
        tag: 'Berry mix',
        note: 'Asam berani',
        color: '#c02a55',
        colorHi: '#ff7fa3',
        colorDark: '#7d1233',
      },
      {
        name: 'Blueberry',
        tag: 'Berry mix',
        note: 'Lembut & dalam',
        color: '#4a5db8',
        colorHi: '#93a5ff',
        colorDark: '#26307a',
      },
      {
        name: 'Stroberi & Pisang',
        tag: 'Creamy',
        note: 'Manis lembut',
        color: '#f26a7a',
        colorHi: '#ffb3bd',
        colorDark: '#b83b53',
      },
      {
        name: 'Cranberry',
        tag: 'Tanpa gula',
        note: 'Tajam segar',
        color: '#b81f4b',
        colorHi: '#ff6f95',
        colorDark: '#6f0d2b',
      },
    ],
  },
  {
    id: 'green-press',
    kicker: '03 — Hijau segar',
    title: 'Green Press',
    script: 'dingin & ringan',
    description:
      'Sayur dan buah hijau diperas dingin agar serat dan rasanya tetap utuh. Ringan di badan, segar di tenggorokan.',
    bg: '#7fa23a',
    ink: '#141a06',
    accent: '#f0ffd4',
    items: [
      {
        name: 'Apel Hijau',
        tag: 'Green press',
        note: 'Manis asam',
        color: '#a8c03c',
        colorHi: '#d6e87a',
        colorDark: '#5f7a1c',
      },
      {
        name: 'Kiwi',
        tag: 'Green press',
        note: 'Segar hijau',
        color: '#6fae3f',
        colorHi: '#b9e07a',
        colorDark: '#3f6b1f',
      },
      {
        name: 'Timun & Lemon',
        tag: 'Detox',
        note: 'Ringan & segar',
        color: '#8fc26a',
        colorHi: '#d3efb0',
        colorDark: '#4f7a32',
      },
      {
        name: 'Bayam & Nanas',
        tag: 'Detox',
        note: 'Manis hijau',
        color: '#5f9a4a',
        colorHi: '#a9d98a',
        colorDark: '#35602a',
      },
    ],
  },
]

export const tickerWords = [
  'Diperas Dingin',
  'Tanpa Gula',
  'Buah Asli',
  'Segar',
  'Serat Alami',
  'Vegan',
  'Tanpa Pengawet',
]

export const tickerWordsAlt = [
  'Fresh',
  'Cold-Pressed',
  'Real Fruit',
  'Daily',
  'Bright',
  'Clean',
]

export const introWords = ['pembuat jus', 'pencinta buah', 'teman pagi', 'Jussy']

export const values = [
  {
    label: 'Buah asli',
    stat: '100%',
    description:
      'Buah utuh dipanen dari kebun mitra lokal, lalu diperas pada hari yang sama — tanpa konsentrat, tanpa perasa tambahan.',
    from: '#f5d33f',
    to: '#ef7442',
  },
  {
    label: 'Tanpa gula tambahan',
    stat: '0%',
    description:
      'Rasa manis hanya dari buah. Tidak ada sirup, pemanis buatan, atau pengawet di dalam botol.',
    from: '#8f5ba7',
    to: '#a83e6d',
  },
  {
    label: 'Diperas dingin',
    stat: '48 jam',
    description:
      'Diproses cold-pressed agar vitamin dan enzim tetap terjaga. Paling segar dinikmati dalam 48 jam.',
    from: '#a8c03c',
    to: '#3f6b3a',
  },
]

export const stories = [
  {
    title: 'Kebun mitra',
    caption: 'Buah pilihan dari petani lokal',
    from: '#3f6b3a',
    to: '#a8c03c',
  },
  {
    title: 'Diperas dingin',
    caption: 'Tanpa panas, tanpa gula',
    from: '#ef7442',
    to: '#f5d33f',
  },
  {
    title: 'Diantar segar',
    caption: 'Sampai dalam 48 jam',
    from: '#a83e6d',
    to: '#ef7442',
  },
]

export const socials = [
  {
    label: 'Instagram',
    handle: '@jussy.id',
    from: '#ef7442',
    to: '#a83e6d',
  },
  {
    label: 'TikTok',
    handle: '@jussy.id',
    from: '#0a0c0a',
    to: '#3f6b3a',
  },
  {
    label: 'WhatsApp',
    handle: '+62 812 0000 0000',
    from: '#a8c03c',
    to: '#3f6b3a',
  },
  {
    label: 'Email',
    handle: 'hello@jussy.id',
    from: '#f5d33f',
    to: '#ef7442',
  },
]
