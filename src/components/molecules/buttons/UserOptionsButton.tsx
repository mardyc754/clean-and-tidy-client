import {
  faCircleUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { useLogout } from '~/hooks/auth/useLogout';

import { getUserLabel } from '~/utils/userUtils';

import { UserRole } from '~/types/enums';

import ButtonWithDropdown from './ButtonWithDropdown';

interface UserOptionsButtonProps {
  userData: AuthenticatedUser;
}

const UserOptionsDropdown = ({ userData }: UserOptionsButtonProps) => {
  const { logout } = useLogout();

  let profileHref = '/';

  switch (userData.role) {
    case UserRole.CLIENT:
      profileHref = '/client/profile';
      break;
    case UserRole.EMPLOYEE:
      profileHref = '/employee/profile';
      break;
    case UserRole.ADMIN:
      profileHref = '/admin/profile';
      break;
    default:
      break;
  }

  return (
    <ButtonWithDropdown
      label={getUserLabel(userData)}
      dropdownItemsData={[
        {
          label: <Link href={profileHref}>Your profile</Link>,
          icon: faCircleUser
        },
        {
          label: <span onClick={logout}>Log out</span>,
          icon: faRightFromBracket
        }
      ]}
    />
  );
};

export default UserOptionsDropdown;
