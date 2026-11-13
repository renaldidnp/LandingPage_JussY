import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { brand, nav } from '../data/site'
import { cn } from '../lib/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 28)
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          'mx-auto flex max-w-[1532px] items-center justify-between gap-4 rounded-full border px-4 py-2 transition-all duration-500 sm:px-6 sm:py-2.5',
          scrolled
            ? 'border-ink/10 bg-cream/85 shadow-[0_18px_50px_-30px_rgba(10,12,10,0.55)] backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-1.5 py-2 -my-2 font-script text-2xl leading-none sm:text-[1.7rem]"
        >
          {brand.name}
          <span className="mb-1.5 h-1.5 w-1.5 rounded-full bg-juice" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline -my-3 py-3 font-nav text-[13px] font-bold uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontak"
            className="hidden rounded-full bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-juice hover:text-ink sm:inline-flex"
          >
            Pesan jus
          </a>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  'absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-300',
                  open && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[5px] h-[1.5px] w-full bg-ink transition-opacity duration-300',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[10px] h-[1.5px] w-full bg-ink transition-transform duration-300',
                  open && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-[1532px] overflow-hidden rounded-3xl border border-ink/10 bg-cream/95 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-nav text-lg font-bold uppercase tracking-[0.04em] transition-colors hover:bg-ink/5"
              >
                {item.label}
                <span aria-hidden="true" className="text-ink/40">
                  &rarr;
                </span>
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center rounded-2xl bg-ink px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-cream"
            >
              Pesan jus
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
