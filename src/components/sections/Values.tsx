import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { stories, values } from '../../data/site'
import { cn } from '../../lib/cn'
import { useMediaQuery } from '../../lib/useMediaQuery'

function StoryMotif({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" aria-hidden="true">
        <path
          d="M92 22C68 20 42 32 34 58c-4 14 4 30 20 36 4-20 16-38 38-46-18 12-30 30-34 50 18-4 32-18 36-36 2-10 0-22-2-40Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M52 96C60 70 74 50 94 38"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="29" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="13" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M10 76c16-26 32-26 48 0s32 26 48 0M10 48c16-26 32-26 48 0s32 26 48 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 104c16-26 32-26 48 0s32 26 48 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".5"
      />
    </svg>
  )
}

export function Values() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const driftA = useTransform(scrollYProgress, [0, 1], [80, -80])
  const driftB = useTransform(scrollYProgress, [0, 1], [130, -130])
  const driftC = useTransform(scrollYProgress, [0, 1], [50, -50])
  const drifts = [driftA, driftB, driftC]

  return (
    <section id="nilai" ref={sectionRef} className="section-pad relative bg-cream">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="eyebrow">Mengapa Jussy</p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,6.6vw,6.2rem)] font-black leading-[1] tracking-[-0.03em]">
              Biarkan buah{' '}
              <span className="font-script font-normal text-juice">berbicara.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/65 lg:pb-2">
            Kami bekerja dekat dengan petani buah lokal. Setiap botol diperas
            dingin dari bahan yang bisa dilacak — tanpa gula tambahan dan tanpa
            perasa buatan.
          </p>
        </div>

        <div
          role="region"
          aria-label="Cerita Jussy"
          className="no-scrollbar -mx-[18px] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[18px] px-[18px] pt-1 pb-4 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0 lg:mt-20 lg:gap-6"
        >
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              style={{
                y: reduceMotion || !isDesktop ? 0 : drifts[index],
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'grain relative aspect-[4/5] w-[80vw] max-w-[330px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-ink/10 shadow-[0_40px_70px_-50px_rgba(10,12,10,0.65)] sm:w-auto sm:max-w-none',
                index === 1 && 'sm:translate-y-10',
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(150deg, ${story.from}, ${story.to})`,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35"
                style={{
                  background:
                    'radial-gradient(circle at 28% 16%, rgba(255,255,255,.85), transparent 38%), radial-gradient(circle at 78% 84%, rgba(10,12,10,.55), transparent 46%)',
                }}
              />

              <div className="absolute inset-7 flex items-center justify-center text-cream/30 sm:inset-9">
                <StoryMotif index={index} />
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-cream">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-cream/60">
                    0{index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl">
                    {story.title}
                  </h3>
                  <p className="mt-1 text-xs text-cream/70">{story.caption}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/40"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:mt-16 sm:grid-cols-3 lg:mt-28">
          {values.map((item) => (
            <div key={item.label} className="bg-cream p-6 sm:p-8">
              <p className="font-display text-[clamp(2.6rem,4vw,3.6rem)] font-black leading-none">
                {item.stat}
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/50">
                {item.label}
              </p>
              <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-ink/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
          <p className="font-script text-2xl text-juice sm:text-3xl">
            diperas dengan sabar.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Tanpa gula', 'Buah lokal', 'Cold-pressed', 'Tanpa pengawet'].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
