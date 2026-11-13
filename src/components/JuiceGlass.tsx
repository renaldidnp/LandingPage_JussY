import { useId } from 'react'
import { cn } from '../lib/cn'

type JuiceGlassProps = {
  color: string
  colorHi: string
  colorDark: string
  className?: string
}

export function JuiceGlass({
  color,
  colorHi,
  colorDark,
  className,
}: JuiceGlassProps) {
  const uid = useId().replace(/:/g, '')
  const liquidId = `liquid-${uid}`
  const glassClipId = `glass-${uid}`
  const shineId = `shine-${uid}`

  return (
    <svg
      viewBox="0 0 200 230"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={liquidId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorHi} />
          <stop offset="48%" stopColor={color} />
          <stop offset="100%" stopColor={colorDark} />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={glassClipId}>
          <path d="M56 52h88l-10 144a14 14 0 0 1-14 13H80a14 14 0 0 1-14-13L56 52Z" />
        </clipPath>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="100" cy="216" rx="46" ry="9" fill="#000000" opacity="0.16" />

      {/* straw behind the glass */}
      <g transform="rotate(11 134 48)">
        <rect x="127" y="-8" width="15" height="104" rx="7.5" fill="#ffffff" opacity="0.86" />
        <rect x="127" y="-8" width="5.5" height="104" rx="2.75" fill={colorHi} opacity="0.75" />
      </g>

      {/* liquid */}
      <g clipPath={`url(#${glassClipId})`}>
        <rect x="52" y="86" width="96" height="130" fill={`url(#${liquidId})`} />
        <ellipse cx="100" cy="86" rx="39" ry="7" fill={colorHi} opacity="0.85" />
        <rect x="70" y="98" width="27" height="27" rx="7" fill="#ffffff" opacity="0.16" transform="rotate(-16 83 111)" />
        <rect x="102" y="90" width="23" height="23" rx="6" fill="#ffffff" opacity="0.13" transform="rotate(13 113 101)" />
        <circle cx="82" cy="146" r="4.5" fill="#ffffff" opacity="0.3" />
        <circle cx="112" cy="164" r="3.4" fill="#ffffff" opacity="0.26" />
        <circle cx="92" cy="184" r="2.6" fill="#ffffff" opacity="0.22" />
      </g>

      {/* glass body */}
      <path
        d="M56 52h88l-10 144a14 14 0 0 1-14 13H80a14 14 0 0 1-14-13L56 52Z"
        fill="#ffffff"
        fillOpacity="0.12"
        stroke="#ffffff"
        strokeOpacity="0.62"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M70 72c-3 38 2 78 13 110"
        fill="none"
        stroke={`url(#${shineId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="100"
        cy="52"
        rx="44"
        ry="8.5"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="2.4"
      />

      {/* citrus garnish on the rim */}
      <g transform="translate(142 52)">
        <circle r="15" fill={colorHi} opacity="0.95" />
        <circle r="15" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
        <circle r="5" fill="#ffffff" opacity="0.5" />
        <path
          d="M0-13V13M-13 0H13M-9-9 9 9M-9 9 9-9"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  )
}
