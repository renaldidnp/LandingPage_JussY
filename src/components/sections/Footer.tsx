import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { brand, socials } from '../../data/site'
import { Wave } from '../Wave'

type FormStatus = 'idle' | 'error' | 'done'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setStatus(valid ? 'done' : 'error')
    if (valid) setEmail('')
  }

  const message =
    status === 'error'
      ? 'Email belum valid. Coba periksa lagi, ya.'
      : status === 'done'
        ? 'Terima kasih! Sampai jumpa di inbox.'
        : ''

  return (
    <footer id="kontak" className="relative overflow-hidden bg-ink text-cream">
      <Wave
        fill="var(--color-cream)"
        flip
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(30px,4.5vw,72px)]"
      />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-[60vw] w-[60vw] rounded-full bg-juice/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[42vw] w-[42vw] rounded-full bg-leaf/10 blur-[110px]" />

      <div className="section-shell relative pt-[clamp(110px,14vw,190px)] pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow text-cream/60">Kabar segar</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,8vw,7.2rem)] font-black leading-[0.95] tracking-[-0.035em]">
              Segar
              <span className="block font-script text-[0.82em] font-normal tracking-normal text-juice">
                di inbox.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/60">
              Rasa baru, batch terbatas, dan cerita dari dapur jus. Sesekali
              saja, tidak berisik.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 max-w-md">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status !== 'idle') setStatus('idle')
                  }}
                  placeholder="Email kamu"
                  className="h-12 w-full rounded-full border border-cream/20 bg-transparent px-5 text-base text-cream placeholder:text-cream/35 transition-colors focus:border-juice focus:outline-none sm:flex-1 sm:text-sm"
                />
                <button
                  type="submit"
                  className="h-12 w-full rounded-full bg-cream px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-juice sm:w-auto"
                >
                  Kirim
                </button>
              </div>
              <p
                role="status"
                className="mt-3 min-h-5 text-xs text-cream/55"
                aria-live="polite"
              >
                {message}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href="#kontak"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 p-5"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `linear-gradient(150deg, ${social.from}, ${social.to})`,
                  }}
                />
                <div className="relative flex h-full min-h-[116px] flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/65">
                      {social.label}
                    </p>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-cream/50 transition-colors group-hover:text-cream"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="mt-8 font-display text-base font-semibold leading-tight sm:text-lg">
                    {social.handle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-script text-3xl leading-none">{brand.name}</p>
            <p className="mt-2 text-xs text-cream/45">{brand.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
            {['Instagram', 'TikTok', 'WhatsApp'].map((item) => (
              <a
                key={item}
                href="#kontak"
                className="link-underline -my-3.5 py-3.5 transition-colors hover:text-cream"
              >
                {item}
              </a>
            ))}
            <span>
              &copy; {brand.year} {brand.name}
            </span>
          </div>
        </div>

        <p className="mt-10 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-cream/25">
          Jussy · Jus cold-pressed dari Bandung
        </p>
      </div>
    </footer>
  )
}
