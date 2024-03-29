export enum CleaningFrequency {
  ONCE = 'ONCE',
  ONCE_A_WEEK = 'ONCE_A_WEEK',
  EVERY_TWO_WEEKS = 'EVERY_TWO_WEEKS',
  ONCE_A_MONTH = 'ONCE_A_MONTH'
}

export enum Status {
  TO_BE_CONFIRMED = 'TO_BE_CONFIRMED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  TO_BE_CANCELLED = 'TO_BE_CANCELLED',
  CANCELLED = 'CANCELLED',
  UNKNOWN = 'UNKNOWN' // extra status used exclusively by client for handling undefined status
}

export enum UserRole {
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}
