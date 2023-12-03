import { useQuery } from '@tanstack/react-query';

import { getHolidayDates } from '~/api/dates';

export function useHolidays(year: number, enabled = true) {
  const { data: holidays } = useQuery({
    queryKey: ['holidays', year],
    queryFn: () => getHolidayDates(year),
    enabled
  });

  return { holidays };
}
