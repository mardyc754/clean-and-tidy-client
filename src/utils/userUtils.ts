import type {
  AdminUser,
  AuthenticatedUser,
  ClientUser,
  EmployeeUser,
  RegularEmployeeUser,
  User
} from '~/schemas/api/auth';
import { Address } from '~/schemas/forms/orderService';

import { UserRole } from '~/types/enums';

export function getUserFullName(
  user: Omit<AuthenticatedUser, 'isAdmin' | 'role'>
) {
  return user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : null;
}

export function getUserDisplayName(user: AuthenticatedUser) {
  return getUserFullName(user) ?? user.email;
}

export function getUserLabel(user: AuthenticatedUser) {
  return getUserFullName(user) ?? user.email;
}

export const isClientUser = (user: User | undefined): user is ClientUser => {
  return !!user && 'role' in user && user.role === UserRole.CLIENT;
};

export const isEmployeeUser = (
  user: User | undefined
): user is EmployeeUser => {
  return (
    !!user &&
    'role' in user &&
    [UserRole.EMPLOYEE, UserRole.ADMIN].includes(user.role)
  );
};

export const isRegularEmployeeUser = (
  user: User | undefined
): user is RegularEmployeeUser => {
  return !!user && 'role' in user && user.role === UserRole.EMPLOYEE;
};

export const isAdminUser = (user: User | undefined): user is AdminUser => {
  return !!user && 'role' in user && user.role === UserRole.ADMIN;
};

export const isAuthenticated = (
  user: User | undefined
): user is AuthenticatedUser => {
  return !!user && 'role' in user;
};

export const generateAddressAsString = (address: Address) => {
  const { street, houseNumber, postCode } = address;
  return `${street} ${houseNumber}, ${postCode} Kraków`;
};
