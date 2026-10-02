import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

// Values from the design handoff (chanhdai.com button.tsx): radius 10px, 36px default,
// 80% fill on hover, scale(.98) on press (none for `link`).
export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-150 ease-out outline-none select-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive: 'border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20',
        link: 'border-transparent text-primary decoration-1 underline-offset-3 hover:underline active:scale-100',
      },
      size: {
        'default': 'h-9 gap-1.5 px-2.5',
        'xs': 'h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*=size-])]:size-3',
        'sm': 'h-8 gap-1 px-2.5',
        'lg': 'h-10 gap-1.5 px-2.5',
        'icon': 'size-9',
        'icon-xs': 'size-6 rounded-md [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
