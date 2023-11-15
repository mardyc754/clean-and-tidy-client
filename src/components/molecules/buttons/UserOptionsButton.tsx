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

  const profileHref =
    userData.role === UserRole.CLIENT ? '/client/profile' : '/employee/profile';

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
