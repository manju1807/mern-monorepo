import * as React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'tw:bg-background tw:group/calendar tw:p-3 tw:[--cell-size:2rem] tw:[[data-slot=card-content]_&]:bg-transparent tw:[[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('tw:w-fit', defaultClassNames.root),
        months: cn(
          'tw:relative tw:flex tw:flex-col tw:gap-4 tw:md:flex-row',
          defaultClassNames.months,
        ),
        month: cn('tw:flex tw:w-full tw:flex-col tw:gap-4', defaultClassNames.month),
        nav: cn(
          'tw:absolute tw:inset-x-0 tw:top-0 tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'tw:h-[--cell-size] tw:w-[--cell-size] tw:select-none tw:p-0 tw:aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'tw:h-[--cell-size] tw:w-[--cell-size] tw:select-none tw:p-0 tw:aria-disabled:opacity-50',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'tw:flex tw:h-[--cell-size] tw:w-full tw:items-center tw:justify-center tw:px-[--cell-size]',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'tw:flex tw:h-[--cell-size] tw:w-full tw:items-center tw:justify-center tw:gap-1.5 tw:text-sm tw:font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'tw:has-focus:border-ring tw:border-input tw:shadow-xs tw:has-focus:ring-ring/50 tw:has-focus:ring-[3px] tw:relative tw:rounded-md tw:border',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn('tw:absolute tw:inset-0 tw:opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'tw:select-none tw:font-medium',
          captionLayout === 'label'
            ? 'tw:text-sm'
            : 'tw:[&>svg]:text-muted-foreground tw:flex tw:h-8 tw:items-center tw:gap-1 tw:rounded-md tw:pl-2 tw:pr-1 tw:text-sm tw:[&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'tw:w-full tw:border-collapse',
        weekdays: cn('tw:flex', defaultClassNames.weekdays),
        weekday: cn(
          'tw:text-muted-foreground tw:flex-1 tw:select-none tw:rounded-md tw:text-[0.8rem] tw:font-normal',
          defaultClassNames.weekday,
        ),
        week: cn('tw:mt-2 tw:flex tw:w-full', defaultClassNames.week),
        week_number_header: cn(
          'tw:w-[--cell-size] tw:select-none',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'tw:text-muted-foreground tw:select-none tw:text-[0.8rem]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'tw:group/day tw:relative tw:aspect-square tw:h-full tw:w-full tw:select-none tw:p-0 tw:text-center tw:[&:first-child[data-selected=true]_button]:rounded-l-md tw:[&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day,
        ),
        range_start: cn('tw:bg-accent tw:rounded-l-md', defaultClassNames.range_start),
        range_middle: cn('tw:rounded-none', defaultClassNames.range_middle),
        range_end: cn('tw:bg-accent tw:rounded-r-md', defaultClassNames.range_end),
        today: cn(
          'tw:bg-accent tw:text-accent-foreground tw:rounded-md tw:data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'tw:text-muted-foreground tw:aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn('tw:text-muted-foreground tw:opacity-50', defaultClassNames.disabled),
        hidden: cn('tw:invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('tw:size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('tw:size-4', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('tw:size-4', className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="tw:flex tw:size-[--cell-size] tw:items-center tw:justify-center tw:text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'tw:data-[selected-single=true]:bg-primary tw:data-[selected-single=true]:text-primary-foreground tw:data-[range-middle=true]:bg-accent tw:data-[range-middle=true]:text-accent-foreground tw:data-[range-start=true]:bg-primary tw:data-[range-start=true]:text-primary-foreground tw:data-[range-end=true]:bg-primary tw:data-[range-end=true]:text-primary-foreground tw:group-data-[focused=true]/day:border-ring tw:group-data-[focused=true]/day:ring-ring/50 tw:flex tw:aspect-square tw:h-auto tw:w-full tw:min-w-[--cell-size] tw:flex-col tw:gap-1 tw:font-normal tw:leading-none tw:data-[range-end=true]:rounded-md tw:data-[range-middle=true]:rounded-none tw:data-[range-start=true]:rounded-md tw:group-data-[focused=true]/day:relative tw:group-data-[focused=true]/day:z-10 tw:group-data-[focused=true]/day:ring-[3px] tw:[&>span]:text-xs tw:[&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
