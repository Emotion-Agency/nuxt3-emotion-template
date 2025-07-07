import type { TooltipRootProps } from 'reka-ui'

export type TooltipProps = TooltipRootProps & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}
