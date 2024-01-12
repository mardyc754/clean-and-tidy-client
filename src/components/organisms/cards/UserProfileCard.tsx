import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { useAuth } from '~/hooks/auth/useAuth';

import { Button } from '~/components/atoms/buttons';
import { IconIndicator } from '~/components/molecules/status-indicators';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { getUserFullName } from '~/utils/userUtils';

import { ChangeUserDataForm } from '../forms';

const UserProfileCard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <IconIndicator variant="error" caption="Error when loading user data" />
    );
  }
  const userFullName = getUserFullName(currentUser);

  return (
    <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 md:space-x-4 md:space-y-0">
      <Card className="md:col-span-1">
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
              {/* 
              <Button
                color="danger"
                className="mt-4"
                onClick={() => {
                  console.log('TODO: implement');
                }}
              >
                Delete account
              </Button> */}
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
