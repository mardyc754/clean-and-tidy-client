import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '~/api/auth';

import { user } from '~/constants/queryKeys';

import type { ClientUser, EmployeeUser, User } from '~/schemas/api/auth';

import { UserRole } from '~/types/enums';

const isClientUser = (user: User | undefined): user is ClientUser => {
  return !!user && 'role' in user && user.role === UserRole.CLIENT;
};

const isEmployeeUser = (user: User | undefined): user is EmployeeUser => {
  return (
    !!user &&
    'role' in user &&
    [UserRole.EMPLOYEE, UserRole.ADMIN].includes(user.role)
  );
};

export const useAuth = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: user,
    queryFn: getCurrentUser
  });

  return {
    currentUser: data && 'role' in data ? data : null,
    error,
    isClient: isClientUser(data),
    isEmployee: isEmployeeUser(data),
    isSuccess
  };
};
