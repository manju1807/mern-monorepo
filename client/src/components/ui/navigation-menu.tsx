import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'tw:relative tw:z-10 tw:flex tw:max-w-max tw:flex-1 tw:items-center tw:justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'tw:group tw:flex tw:flex-1 tw:list-none tw:items-center tw:justify-center tw:space-x-1',
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'tw:group tw:inline-flex tw:h-9 tw:w-max tw:items-center tw:justify-center tw:rounded-md tw:bg-background tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:transition-colors tw:hover:bg-accent tw:hover:text-accent-foreground tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:outline-none tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=open]:text-accent-foreground tw:data-[state=open]:bg-accent/50 tw:data-[state=open]:hover:bg-accent tw:data-[state=open]:focus:bg-accent',
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'tw:group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="tw:relative tw:top-[1px] tw:ml-1 tw:h-3 tw:w-3 tw:transition tw:duration-300 tw:group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'tw:left-0 tw:top-0 tw:w-full tw:data-[motion^=from-]:animate-in tw:data-[motion^=to-]:animate-out tw:data-[motion^=from-]:fade-in tw:data-[motion^=to-]:fade-out tw:data-[motion=from-end]:slide-in-from-right-52 tw:data-[motion=from-start]:slide-in-from-left-52 tw:data-[motion=to-end]:slide-out-to-right-52 tw:data-[motion=to-start]:slide-out-to-left-52 tw:md:absolute tw:md:w-auto tw:',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('tw:absolute tw:left-0 tw:top-full tw:flex tw:justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'tw:origin-top-center tw:relative tw:mt-1.5 tw:h-[var(--radix-navigation-menu-viewport-height)] tw:w-full tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-90 tw:md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'tw:top-full tw:z-[1] tw:flex tw:h-1.5 tw:items-end tw:justify-center tw:overflow-hidden tw:data-[state=visible]:animate-in tw:data-[state=hidden]:animate-out tw:data-[state=hidden]:fade-out tw:data-[state=visible]:fade-in',
      className,
    )}
    {...props}
  >
    <div className="tw:relative tw:top-[60%] tw:h-2 tw:w-2 tw:rotate-45 tw:rounded-tl-sm tw:bg-border tw:shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
