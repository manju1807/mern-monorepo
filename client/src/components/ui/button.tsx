import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:transition-all tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4 tw:shrink-0 tw:[&_svg]:shrink-0 tw:outline-none tw:focus-visible:border-zinc-950 tw:focus-visible:ring-zinc-950/50 tw:focus-visible:ring-[3px] tw:aria-invalid:ring-red-500/20 tw:dark:aria-invalid:ring-red-500/40 tw:aria-invalid:border-red-500 tw:dark:focus-visible:border-zinc-300 tw:dark:focus-visible:ring-zinc-300/50 tw:dark:aria-invalid:ring-red-900/20 tw:dark:dark:aria-invalid:ring-red-900/40 tw:dark:aria-invalid:border-red-900',
  {
    variants: {
      variant: {
        default:
          'tw:bg-zinc-900 tw:text-zinc-50 tw:shadow-xs tw:hover:bg-zinc-900/90 tw:dark:bg-zinc-50 tw:dark:text-zinc-900 tw:dark:hover:bg-zinc-50/90',
        destructive:
          'tw:bg-red-500 tw:text-white tw:shadow-xs tw:hover:bg-red-500/90 tw:focus-visible:ring-red-500/20 tw:dark:focus-visible:ring-red-500/40 tw:dark:bg-red-500/60 tw:dark:bg-red-900 tw:dark:hover:bg-red-900/90 tw:dark:focus-visible:ring-red-900/20 tw:dark:dark:focus-visible:ring-red-900/40 tw:dark:dark:bg-red-900/60',
        outline:
          'tw:border tw:bg-white tw:shadow-xs tw:hover:bg-zinc-100 tw:hover:text-zinc-900 tw:dark:bg-zinc-200/30 tw:dark:border-zinc-200 tw:dark:hover:bg-zinc-200/50 tw:dark:bg-zinc-950 tw:dark:hover:bg-zinc-800 tw:dark:hover:text-zinc-50 tw:dark:dark:bg-zinc-800/30 tw:dark:dark:border-zinc-800 tw:dark:dark:hover:bg-zinc-800/50',
        secondary:
          'tw:bg-zinc-100 tw:text-zinc-900 tw:shadow-xs tw:hover:bg-zinc-100/80 tw:dark:bg-zinc-800 tw:dark:text-zinc-50 tw:dark:hover:bg-zinc-800/80',
        ghost:
          'tw:hover:bg-zinc-100 tw:hover:text-zinc-900 tw:dark:hover:bg-zinc-100/50 tw:dark:hover:bg-zinc-800 tw:dark:hover:text-zinc-50 tw:dark:dark:hover:bg-zinc-800/50',
        link: 'tw:text-zinc-900 tw:underline-offset-4 tw:hover:underline tw:dark:text-zinc-50',
      },
      size: {
        default: 'tw:h-9 tw:px-4 tw:py-2 tw:has-[>svg]:px-3',
        sm: 'tw:h-8 tw:rounded-md tw:gap-1.5 tw:px-3 tw:has-[>svg]:px-2.5',
        lg: 'tw:h-10 tw:rounded-md tw:px-6 tw:has-[>svg]:px-4',
        icon: 'tw:size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
