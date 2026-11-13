import { scenes, tickerWords, tickerWordsAlt } from '../../data/site'
import { Wave } from '../Wave'

const palette = [
  'text-cream',
  'text-citrus',
  'text-juice',
  'text-leaf',
  'text-gold',
  'text-cream/60',
]

type MarqueeRowProps = {
  words: string[]
  reverse?: boolean
  offset?: number
}

function MarqueeRow({ words, reverse = false, offset = 0 }: MarqueeRowProps) {
  const half = [...words, ...words]

  return (
    <div className="marquee overflow-hidden" aria-hidden="true">
      <div className={reverse ? 'marquee-track marquee-track--reverse' : 'marquee-track'}>
        {[0, 1].map((halfIndex) => (
          <div key={halfIndex} className="flex shrink-0 items-center">
            {half.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`flex items-center whitespace-nowrap ${
                  palette[(index + offset) % palette.length]
                }`}
              >
                <span className="px-4 font-display text-[clamp(1.9rem,4.4vw,4rem)] font-black uppercase leading-none tracking-[-0.02em] sm:px-6">
                  {word}
                </span>
                <span className="h-2 w-2 rotate-45 bg-current opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Ticker() {
  return (
    <section
      id="okusi"
      className="relative overflow-hidden bg-ink py-[clamp(52px,7vw,104px)] text-cream"
    >
      <Wave
        fill="var(--color-cream)"
        flip
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(26px,4vw,56px)]"
      />

      <div className="relative z-10 flex flex-col gap-3 sm:gap-5">
        <MarqueeRow words={tickerWords} />
        <MarqueeRow words={tickerWordsAlt} reverse offset={2} />
      </div>

      <Wave
        fill={scenes[0].bg}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(26px,4vw,56px)]"
      />
    </section>
  )
}
