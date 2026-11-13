import { cn } from '../lib/cn'

type WaveProps = {
  fill: string
  className?: string
  flip?: boolean
}

export function Wave({ fill, className, flip = false }: WaveProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn('block w-full', className)}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path
        d="M0,64 C120,116 240,20 360,32 C480,44 540,104 660,96 C780,88 840,16 960,24 C1080,32 1140,104 1260,96 C1350,90 1400,64 1440,56 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  )
}
