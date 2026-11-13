import { useId } from 'react'
import { cn } from '../lib/cn'

type RotatingBadgeProps = {
  text: string
  href: string
  className?: string
}

export function RotatingBadge({ text, href, className }: RotatingBadgeProps) {
  const id = useId().replace(/:/g, '')

  return (
    <a
      href={href}
      aria-label={text}
      className={cn(
        'group relative grid aspect-square place-items-center rounded-full border border-current/25 text-current transition-colors duration-500 hover:border-current/60',
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
        <defs>
          <path
            id={`badge-path-${id}`}
            d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <text fontSize="9" fontWeight="600" letterSpacing="3.1" fill="currentColor">
          <textPath href={`#badge-path-${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute grid h-9 w-9 place-items-center rounded-full bg-current transition-transform duration-500 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-cream" fill="none" aria-hidden="true">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  )
}
