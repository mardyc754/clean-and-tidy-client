import type { RequireAtLeastOne } from 'type-fest';

export type AllServicesQueryOptions = {
  primaryOnly: boolean;
};

export type ServiceQueryOptions = RequireAtLeastOne<{
  includeSecondaryServices: boolean;
  includePrimaryServices: boolean;
  includeCleaningFrequencies: boolean;
}>;

export type RecurringReservationQueryOptions = RequireAtLeastOne<{
  includeReservations: boolean;
  includeServices: boolean;
  includeAddress: boolean;
}>;
