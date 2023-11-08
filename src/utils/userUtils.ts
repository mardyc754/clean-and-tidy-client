import type { ClientUser, EmployeeUser } from '~/schemas/api/auth';

export function getUserLabel(user: EmployeeUser | ClientUser) {
  return user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.email;
}
