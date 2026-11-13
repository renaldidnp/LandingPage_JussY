import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

type FruitOrbProps = {
  color: string
  colorHi: string
  className?: string
  style?: CSSProperties
}

export function FruitOrb({ color, colorHi, className, style }: FruitOrbProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('fruit-orb', className)}
      style={
        {
          ...style,
          '--fruit': color,
          '--fruit-hi': colorHi,
        } as CSSProperties
      }
    />
  )
}
