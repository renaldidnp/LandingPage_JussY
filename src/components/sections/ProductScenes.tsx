import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { Scene } from '../../data/site'
import { scenes } from '../../data/site'
import { cn } from '../../lib/cn'
import { JuiceGlass } from '../JuiceGlass'
import { Wave } from '../Wave'

const TOTAL = scenes.length

export function ProductScenes() {
  return (
    <div id="produk" className="relative">
      {scenes.map((scene, index) => (
        <ProductScene key={scene.id} scene={scene} index={index} />
      ))}
    </div>
  )
}

type ProductSceneProps = {
  scene: Scene
  index: number
}

function ProductScene({ scene, index }: ProductSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const items = scene.items
  const lastIndex = items.length - 1
  const activeItem = items[active]

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
    restDelta: 0.001,
  })

  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.min(
      lastIndex,
      Math.max(0, Math.floor(value * items.length + 0.0001)),
    )
    setActive((current) => (current === next ? current : next))
  })

  const orbRotate = useTransform(progress, [0, 1], [-12, 12])
  const orbScale = useTransform(progress, [0, 0.5, 1], [0.92, 1.05, 0.96])
  const orbY = useTransform(progress, [0, 1], [26, -26])
  const ringRotate = useTransform(progress, [0, 1], [0, 120])
  const wordX = useTransform(progress, [0, 1], ['7%', '-7%'])

  const previousBg = index === 0 ? '#0a0c0a' : scenes[index - 1].bg
  const nextBg = index === TOTAL - 1 ? 'var(--color-cream)' : scenes[index + 1].bg

  const selectFlavor = (itemIndex: number) => {
    setActive(itemIndex)
    const wrapper = wrapperRef.current
    if (!wrapper || reduceMotion) return

    const travel = wrapper.offsetHeight - window.innerHeight
    const top =
      window.scrollY +
      wrapper.getBoundingClientRect().top +
      (travel * (itemIndex + 0.5)) / items.length

    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div
      ref={wrapperRef}
      id={scene.id}
      className="relative h-[190vh] sm:h-[220vh]"
      style={{ backgroundColor: scene.bg }}
    >
      <div
        className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden"
        style={{ backgroundColor: scene.bg, color: scene.ink }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <motion.span
            style={{ x: reduceMotion ? 0 : wordX }}
            className="whitespace-nowrap font-display text-[21vw] font-black uppercase leading-none opacity-[0.07]"
          >
            {scene.title}
          </motion.span>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/4 h-[42vw] w-[42vw] rounded-full border border-current/10 sm:-right-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-[36vw] w-[36vw] rounded-full border border-current/10"
        />

        <div className="scene-shell section-shell relative z-10 flex h-full flex-col pt-[84px] pb-12 sm:pt-[clamp(76px,8vh,110px)] sm:pb-[clamp(66px,8vh,110px)]">
          <header className="flex items-start justify-between gap-6">
            <div>
              <p className="scene-kicker text-[10px] font-semibold uppercase tracking-[0.3em] opacity-55">
                {scene.kicker}
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4.2vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]">
                {scene.title}
              </h2>
            </div>
            <div className="text-right">
              <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] font-semibold leading-none">
                {String(index + 1).padStart(2, '0')}
                <span className="opacity-40"> / {String(TOTAL).padStart(2, '0')}</span>
              </p>
              <p className="mt-2 hidden text-[10px] uppercase tracking-[0.2em] opacity-55 sm:block">
                {activeItem.note}
              </p>
            </div>
          </header>

          <div className="scene-grid grid flex-1 items-center gap-5 py-3 sm:gap-6 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-8">
            <div className="order-2 lg:order-1">
              <p className="scene-description hidden max-w-[34ch] text-sm leading-relaxed opacity-70 sm:block">
                {scene.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-7">
                {items.map((item, itemIndex) => {
                  const isActive = itemIndex === active
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => selectFlavor(itemIndex)}
                      aria-pressed={isActive}
                      className={cn(
                        'group touch-manipulation rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 sm:px-3.5 sm:py-3',
                        isActive
                          ? 'border-current bg-current/10'
                          : 'border-current/20 hover:border-current/50',
                      )}
                    >
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] opacity-50">
                        {String(itemIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block text-[13px] font-semibold leading-tight sm:text-sm">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] opacity-60">
                        {item.tag}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p className="scene-hint mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] opacity-45 lg:hidden">
                Ketuk rasa untuk ganti
              </p>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <motion.div
                style={{
                  rotate: reduceMotion ? 0 : orbRotate,
                  scale: reduceMotion ? 1 : orbScale,
                  y: reduceMotion ? 0 : orbY,
                }}
                className="scene-glass relative aspect-square w-[min(62vw,320px)] sm:w-[min(48vw,400px)] lg:w-[min(30vw,440px)]"
              >
                <motion.div
                  aria-hidden="true"
                  style={{ rotate: reduceMotion ? 0 : ringRotate }}
                  className="absolute inset-0 rounded-full border border-dashed border-current/25"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-[6%] rounded-full border border-current/10"
                />

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeItem.name}
                    initial={{ opacity: 0, scale: 0.82, rotate: -28 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.86, rotate: 24 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-[10%]"
                  >
                    <JuiceGlass
                      color={activeItem.color}
                      colorHi={activeItem.colorHi}
                      colorDark={activeItem.colorDark}
                      className="h-full w-full"
                    />
                  </motion.div>
                </AnimatePresence>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className="float-soft absolute -right-1 top-1 h-12 w-12 rotate-12 opacity-60 sm:h-16 sm:w-16"
                  style={{ '--dur': '8s', '--rot': '14deg' } as CSSProperties}
                >
                  <path
                    d="M92 22C68 20 42 32 34 58c-4 14 4 30 20 36 4-20 16-38 38-46-18 12-30 30-34 50 18-4 32-18 36-36 2-10 0-22-2-40Z"
                    fill="currentColor"
                  />
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-current/20 bg-cream/20 px-4 py-2 backdrop-blur-md"
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[10px]">
                      {activeItem.name} · {activeItem.tag}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="order-3 hidden flex-col items-end text-right lg:flex">
              <div className="relative h-[1.1em] w-full overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={activeItem.name}
                    initial={{ y: '90%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-90%', opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 font-script text-[clamp(2.4rem,4.4vw,4rem)] leading-none"
                  >
                    {activeItem.name}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] opacity-60">
                {activeItem.tag}
              </p>

              <div className="mt-10 flex items-center gap-2">
                {items.map((item, itemIndex) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => selectFlavor(itemIndex)}
                    aria-label={`Pilih ${item.name}`}
                    aria-pressed={itemIndex === active}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      itemIndex === active
                        ? 'w-10 bg-current'
                        : 'w-4 bg-current/25 hover:bg-current/50',
                    )}
                  />
                ))}
              </div>

              <p className="mt-8 max-w-[26ch] text-[10px] font-semibold uppercase tracking-[0.22em] opacity-40">
                Gulir untuk ganti rasa
              </p>
            </div>
          </div>
        </div>
      </div>

      <Wave
        fill={previousBg}
        flip
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[clamp(30px,4.5vw,72px)]"
      />
      <Wave
        fill={nextBg}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(30px,4.5vw,72px)]"
      />
    </div>
  )
}
