import { useMemo } from 'react';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Spinner } from '~/components/molecules/status-indicators';
import { Scheduler } from '~/components/organisms/scheduler';
import { PageWrapper } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import { getMaxEndDateFromReservationVisits } from '~/utils/scheduler';

import { UserRole } from '~/types/enums';

import { UserProfileCard } from '../organisms/cards';
import type { VisitEvent } from '../organisms/scheduler/Scheduler';
import { Tabs } from '../organisms/tabs';
import type { TabsSlot } from '../organisms/tabs/Tabs';

type ProfilePageTemplateProps = {
  slots: TabsSlot[];
  userRole: AuthenticatedUser['role'];
};

const ProfilePageTemplate = ({ slots, userRole }: ProfilePageTemplateProps) => {
  // const reservationsTimeslot = useMemo(() => {
  //   if (!visits) return;

  //   return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  // }, [visits]);

  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>
        <div className="py-8">
          <Tabs
            tabsListClasses={
              userRole === UserRole.ADMIN ? 'grid-cols-4' : 'grid-cols-3'
            }
            slots={[
              ...slots,
              {
                name: 'Profile Data',
                Content: () => <UserProfileCard />
              }
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
