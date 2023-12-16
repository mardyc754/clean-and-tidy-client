import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { useAuth } from '~/hooks/auth/useAuth';

import { IconIndicator } from '~/components/molecules/status-indicators';
import { Button } from '~/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { getUserFullName, getUserLabel } from '~/utils/userUtils';

import { ChangeUserDataForm } from '../forms';

interface UserCardProps {
  data: AuthenticatedUser;
}

interface UserProfileCardProps {
  data: AuthenticatedUser;
}

const UserCard = ({ data }: UserCardProps) => {
  const userFullName = getUserFullName(data);
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Your data</CardTitle>
      </CardHeader>
      {'phone' in data && (
        <CardContent className="py-4">
          {userFullName && <p className="text-xl">{getUserFullName(data)}</p>}
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{`${data.email}`}</p>
            </div>
            {data.phone && (
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhone} />
                <p>{`${data.phone}`}</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const UserProfileCard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <IconIndicator variant="error" caption="Error when loading user data" />
    );
  }

  return (
    <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 md:space-x-8 md:space-y-0">
      <UserCard data={currentUser} />
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Change your profile data</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangeUserDataForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileCard;
