import type { RequireAtLeastOne } from 'type-fest';

import { CleaningFrequency } from '~/types/enums';

export type AllServicesQueryOptions = RequireAtLeastOne<{
  primaryOnly: boolean;
  includeEmployee: boolean;
}>;

export type ServiceQueryOptions = RequireAtLeastOne<{
  includeSecondaryServices: boolean;
  includePrimaryServices: boolean;
  includeCleaningFrequencies: boolean;
}>;

export type ReservationQueryOptions = RequireAtLeastOne<{
  includeVisits: boolean;
  includeServices: boolean;
  includeAddress: boolean;
}>;

export type VisitQueryOptions = RequireAtLeastOne<{
  includeEmployee: boolean;
}>;

export type ServiceBusyHoursQueryOptions = Partial<{
  from: string;
  to: string;
  serviceIds: number[];
  step: Omit<CleaningFrequency, 'ONCE'>;
}>;
