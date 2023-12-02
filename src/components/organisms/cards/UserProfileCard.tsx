import * as React from 'react';

import { AuthenticatedUser } from '~/schemas/api/auth';

import { Button } from '~/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';
import { Input } from '~/components/shadcn/ui/input';
import { Label } from '~/components/shadcn/ui/label';

import { getUserLabel } from '~/utils/userUtils';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue

interface UserProfileCardProps {
  data: AuthenticatedUser;
}

const UserProfileCard = ({ data }: UserProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getUserLabel(data)}</CardTitle>
        <CardDescription>{data.email}</CardDescription>
      </CardHeader>
      {'phone' in data && (
        <CardContent>
          <p>{`Phone number: ${data.phone}`}</p>
        </CardContent>
      )}
      <CardFooter className="flex justify-between">
        <Button>Edit profile data</Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
