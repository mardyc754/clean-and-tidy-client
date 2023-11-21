import type { RequireAtLeastOne } from 'type-fest';

export type AllServicesQueryOptions = RequireAtLeastOne<{
  primaryOnly: boolean;
  includeEmployees: boolean;
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
  includeEmployees: boolean;
}>;
