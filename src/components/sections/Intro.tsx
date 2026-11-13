import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { introWords } from '../../data/site'

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5])

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setWordIndex((value) => (value + 1) % introWords.length)
    }, 2400)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <section id="cerita" ref={sectionRef} className="section-pad relative">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-10">
          <div>
            <p className="eyebrow">Cerita kami</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,5.2rem)] font-black leading-[1.02] tracking-[-0.025em]">
              Sebut saja kami
              <span className="mt-1 block font-script text-[1.02em] font-normal tracking-normal text-juice">
                <span className="relative block h-[1.08em] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={introWords[wordIndex]}
                      initial={{ y: '85%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-85%', opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 block"
                    >
                      {introWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Berawal dari dapur rumah dan kebiasaan menyiapkan jus segar untuk
              keluarga. Kami percaya hal baik tidak perlu rumit: buah pilihan,
              tanpa gula tambahan, dan waktu yang cukup untuk menikmatinya.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#nilai"
                className="link-underline -my-3 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink"
              >
                Kenali kami &rarr;
              </a>
              <div className="flex flex-wrap gap-2">
                {['Sejak 2019', 'Bandung', 'Diperas dingin'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            style={{
              y: reduceMotion ? 0 : cardY,
              rotate: reduceMotion ? 0 : cardRotate,
            }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[36px] border border-ink/10 shadow-[0_50px_90px_-60px_rgba(10,12,10,0.7)]">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, #f5d33f 0%, #ef7442 48%, #7fa23a 100%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at 30% 18%, rgba(255,255,255,.85), transparent 34%), radial-gradient(circle at 72% 78%, rgba(42,17,8,.5), transparent 46%)',
                }}
              />

              <svg
                aria-hidden="true"
                viewBox="0 0 200 240"
                className="absolute bottom-0 left-1/2 h-[62%] w-[78%] -translate-x-1/2 text-cream/25"
                fill="none"
              >
                <circle cx="100" cy="136" r="72" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="136" r="52" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="136" r="16" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M100 64v144M28 136h144M49 85l102 102M49 187 151 85"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity=".7"
                />
              </svg>

              <div className="absolute inset-x-0 top-[16%] text-center">
                <p className="font-script text-[clamp(3rem,8vw,4.8rem)] leading-none text-cream drop-shadow-[0_10px_30px_rgba(10,12,10,0.35)]">
                  Jussy
                </p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.34em] text-cream/70">
                  sejak 2019
                </p>
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur">
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/50">
                  Dapur jus kami
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Diperas segar setiap pagi.
                </p>
              </div>
            </div>

            <div className="absolute left-0 top-5 grid h-14 w-14 rotate-[-10deg] place-items-center rounded-full border border-ink/15 bg-cream text-center text-[8px] font-semibold uppercase leading-tight tracking-[0.14em] text-ink/70 shadow-lg sm:-left-6 sm:top-6 sm:h-20 sm:w-20">
              <span>
                100%
                <br />
                buah
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
