import Link from 'next/link';
import {
  faCircleUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import { useLogout } from '~/hooks/auth/useLogout';

import { getUserLabel } from '~/utils/userUtils';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import ButtonWithDropdown from './ButtonWithDropdown';
import { UserRole } from '~/types/enums';

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
