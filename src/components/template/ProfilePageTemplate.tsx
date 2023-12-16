import { useMemo } from 'react';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Spinner } from '~/components/molecules/status-indicators';
import { Scheduler } from '~/components/organisms/scheduler';
import { PageWrapper } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import { getMaxEndDateFromReservationVisits } from '~/utils/scheduler';

import { UserProfileCard } from '../organisms/cards';
import type { VisitEvent } from '../organisms/scheduler/Scheduler';
import { Tabs } from '../organisms/tabs';
import type { TabsSlot } from '../organisms/tabs/Tabs';

type ProfilePageTemplateProps = {
  // visits: VisitEvent[];
  userData: AuthenticatedUser;
  slots: TabsSlot[];
};

const ProfilePageTemplate = ({
  // visits,
  userData,
  slots
}: ProfilePageTemplateProps) => {
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
            slots={[
              ...slots,
              {
                name: 'Profile Data',
                Content: () => <UserProfileCard data={userData} />
              }
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
