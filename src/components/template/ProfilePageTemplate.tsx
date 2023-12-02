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

type ProfilePageTemplateProps = {
  visits: VisitEvent[];
  userData: AuthenticatedUser;
  isLoadingEvents?: boolean;
  children?: React.ReactNode;
};

const ProfilePageTemplate = ({
  children,
  visits,
  userData,
  isLoadingEvents = false
}: ProfilePageTemplateProps) => {
  const reservationsTimespan = useMemo(() => {
    if (!visits) return;

    return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  }, [visits]);

  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>

        <div className="py-8">
          <UserProfileCard data={userData} />
        </div>
        {children}
        <div className="flex flex-col items-baseline py-8">
          <Heading2>Visit calendar</Heading2>
          <div className="flex w-full items-center justify-center py-8">
            {!isLoadingEvents ? (
              <Scheduler
                className="w-full"
                events={visits}
                length={reservationsTimespan}
              />
            ) : (
              <Spinner caption="Loading events..." />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
