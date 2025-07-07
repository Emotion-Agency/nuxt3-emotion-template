import type { TooltipProps } from './tooltip'

export interface IButton {
  tag?: string
  type?: 'button' | 'submit' | 'reset' | null
  href?: string
}

export interface IButtonProps extends IButton {
  size?: 'sm' | 'md' | 'lg'
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'ghost-primary'
    | 'ghost-danger'
    | 'outline'
    | 'danger'
}

export interface IIconButtonProps extends Omit<IButtonProps, 'size'> {
  label: string
  tooltipProps?: TooltipProps
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disableTooltip?: boolean
}
