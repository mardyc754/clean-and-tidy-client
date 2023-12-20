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

const UserCard = ({ data: currentUser }: UserCardProps) => {
  const userFullName = getUserFullName(currentUser);
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Your data</CardTitle>
      </CardHeader>
      {'phone' in currentUser && (
        <CardContent className="py-4">
          {userFullName && (
            <p className="text-xl">{getUserFullName(currentUser)}</p>
          )}
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{`${currentUser.email}`}</p>
            </div>
            {currentUser.phone && (
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhone} />
                <p>{`${currentUser.phone}`}</p>
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
  const userFullName = getUserFullName(currentUser);

  return (
    <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 md:space-x-8 md:space-y-0">
      <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle>Your data</CardTitle>
        </CardHeader>
        {'phone' in currentUser && (
          <CardContent className="py-4">
            {userFullName && (
              <p className="text-xl">{getUserFullName(currentUser)}</p>
            )}
            <div className="py-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{`${currentUser.email}`}</p>
              </div>
              {currentUser.phone && (
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faPhone} />
                  <p>{`${currentUser.phone}`}</p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
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
