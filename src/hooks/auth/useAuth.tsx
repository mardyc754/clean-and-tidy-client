import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '~/api/auth';
import { hasError } from '~/api/handleFetchingData';

import { user } from '~/constants/queryKeys';

import type { ClientUser, EmployeeUser, User } from '~/schemas/api/auth';

import { UserRole } from '~/types/enums';

export const useAuth = () => {
  // const { setUserData } = useCurrentUserStore((state) => state);

  const { data, error } = useQuery({
    queryKey: user,
    queryFn: getCurrentUser
  });

  // useEffect(() => {
  //   if (data && !hasError(data)) {
  //     setUserData(data);
  //   } else {
  //     setUserData(null);
  //   }
  // }, [data]);

  const isClientUser = (user: User | undefined): user is ClientUser =>
    !!user && 'role' in user && user.role === UserRole.CLIENT;

  const isEmployeeUser = (user: User | undefined): user is EmployeeUser =>
    !!user &&
    'role' in user &&
    [UserRole.EMPLOYEE, UserRole.ADMIN].includes(user.role);

  const isClient = !hasError(data) && isClientUser(data);
  const isEmployee = !hasError(data) && isEmployeeUser(data);

  return { data, error, isClient, isEmployee };
};
