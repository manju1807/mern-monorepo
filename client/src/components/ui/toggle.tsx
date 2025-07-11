import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:hover:bg-muted tw:hover:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=on]:bg-accent tw:data-[state=on]:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'tw:bg-transparent',
        outline:
          'tw:border tw:border-input tw:bg-transparent tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground',
      },
      size: {
        default: 'tw:h-9 tw:px-2 tw:min-w-9',
        sm: 'tw:h-8 tw:px-1.5 tw:min-w-8',
        lg: 'tw:h-10 tw:px-2.5 tw:min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
