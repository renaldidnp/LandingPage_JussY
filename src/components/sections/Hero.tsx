import { useRef } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { FruitOrb } from '../FruitOrb'
import { RotatingBadge } from '../RotatingBadge'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 0.4 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const floatAX = useTransform(springX, (value) => value * -46)
  const floatAY = useTransform(springY, (value) => value * -34)
  const floatBX = useTransform(springX, (value) => value * 46)
  const floatBY = useTransform(springY, (value) => value * 34)
  const floatCX = useTransform(springX, (value) => value * 28)
  const floatCY = useTransform(springY, (value) => value * -52)

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[84px] pb-8 sm:pt-32 lg:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(72% 62% at 78% 30%, rgba(239,116,66,0.28), transparent 64%), radial-gradient(58% 56% at 6% 84%, rgba(168,192,60,0.2), transparent 62%), radial-gradient(46% 46% at 44% 2%, rgba(245,211,63,0.18), transparent 66%)',
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{ x: floatAX, y: floatAY }}
        className="pointer-events-none absolute left-[4%] top-[24%] hidden sm:block"
      >
        <FruitOrb
          color="#ffb02e"
          colorHi="#ffd97a"
          className="float-soft h-16 w-16 opacity-90 lg:h-24 lg:w-24"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: floatBX, y: floatBY }}
        className="pointer-events-none absolute right-[4%] top-[16%] hidden lg:block"
      >
        <FruitOrb
          color="#a8c03c"
          colorHi="#d6e87a"
          className="float-soft h-14 w-14 opacity-80"
          style={{ '--dur': '9s' } as CSSProperties}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: floatCX, y: floatCY }}
        className="pointer-events-none absolute bottom-[16%] left-[40%] hidden md:block"
      >
        <FruitOrb
          color="#c02a55"
          colorHi="#ff7fa3"
          className="float-soft h-11 w-11 opacity-80 lg:h-14 lg:w-14"
        />
      </motion.div>

      <div className="section-shell relative">
        <div className="hero-grid grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
          <motion.div
            style={{
              y: reduceMotion ? 0 : headlineY,
              opacity: reduceMotion ? 1 : fade,
            }}
          >
            <p className="eyebrow">Cold-pressed juice · Buah lokal</p>
            <h1 className="hero-title mt-4 font-display text-[clamp(2.6rem,12vw,3.6rem)] font-black leading-[0.98] tracking-[-0.03em] sm:mt-5 sm:text-[clamp(3.3rem,7.6vw,6.9rem)]">
              Momen segar,
              <span className="mt-1 block font-script text-[0.9em] font-normal tracking-normal text-juice">
                diperas alami.
              </span>
            </h1>
            <p className="hero-copy mt-4 max-w-md text-base leading-relaxed text-ink/70 sm:mt-6">
              Jus dari buah lokal pilihan, diperas dingin tanpa gula tambahan.
              Segar seperti baru dipetik — langsung ke botolmu.
            </p>

            <div className="hero-actions mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8">
              <a
                href="#produk"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-base font-bold leading-none tracking-normal text-cream transition-colors duration-300 hover:bg-juice hover:text-ink"
              >
                Lihat menu jus
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#cerita"
                className="link-underline -my-3.5 py-3.5 text-base font-semibold tracking-normal text-ink/70 transition-colors hover:text-ink"
              >
                Cerita kami
              </a>
            </div>

            <ul className="hero-tags mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 sm:mt-9 sm:gap-x-6">
              <li>Cold-pressed</li>
              <li>Tanpa gula</li>
              <li>Buah lokal</li>
            </ul>
          </motion.div>

          <motion.div
            style={{
              y: reduceMotion ? 0 : visualY,
              opacity: reduceMotion ? 1 : fade,
            }}
            className="hero-visual relative mx-auto w-full max-w-[660px] lg:ml-auto lg:mr-0"
          >
            <div className="relative mx-auto aspect-[5/4] w-full sm:aspect-[6/5]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(239,116,66,0.36), rgba(245,211,63,0.18) 46%, transparent 72%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10"
              />
              <div
                aria-hidden="true"
                className="spin-slow absolute left-1/2 top-1/2 aspect-square w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/20"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/55 blur-xl"
              />

              <motion.div
                style={{ x: floatBX, y: floatBY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="float-soft w-[104%] sm:w-[102%]"
                  style={{ '--dur': '9s' } as CSSProperties}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/produk-utama-480.webp 480w, /produk-utama-800.webp 800w, /produk-utama-1100.webp 1100w, /produk-utama-1376.webp 1376w"
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 62vw, 660px"
                    />
                    <img
                      src="/ProdukUtama.png"
                      alt="Jussy — produk jus"
                      width={1376}
                      height={768}
                      fetchPriority="high"
                      className="block h-auto w-full object-contain drop-shadow-[0_36px_44px_rgba(61,28,9,0.4)]"
                    />
                  </picture>
                </div>
              </motion.div>

              <div className="absolute bottom-0 right-0 rounded-2xl border border-ink/10 bg-cream/90 px-3 py-2 shadow-[0_20px_50px_-30px_rgba(10,12,10,0.6)] backdrop-blur sm:bottom-2 sm:right-2 sm:px-5 sm:py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/55 sm:text-[10px] sm:tracking-[0.22em]">
                  Produk utama
                </p>
                <p className="mt-0.5 font-display text-base font-semibold leading-tight sm:mt-1 sm:text-lg">
                  Jussy Original
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-ink/45 sm:text-[11px] sm:tracking-[0.14em]">
                  Cold-pressed · 100% buah
                </p>
              </div>

              <RotatingBadge
                text="SEGAR · TANPA GULA · BUAH ASLI · "
                href="#produk"
                className="absolute left-0 top-0 h-[76px] w-[76px] bg-juice text-ink sm:left-1 sm:top-1 sm:h-24 sm:w-24"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 hidden justify-center lg:flex">
        <div className="flex flex-col items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.4em] text-ink/40">
          <span>Scroll</span>
          <span aria-hidden="true" className="h-10 w-px bg-ink/20">
            <span className="float-soft block h-full w-px bg-ink/50" />
          </span>
        </div>
      </div>
    </section>
  )
}
