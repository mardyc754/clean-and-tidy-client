import { useMemo } from 'react';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Spinner } from '~/components/molecules/status-indicators';
import { Scheduler } from '~/components/organisms/scheduler';
import { PageWrapper } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import {
  type getEventsFromReservation,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';
import { getUserLabel } from '~/utils/userUtils';

type ProfilePageTemplateProps = {
  visits: ReturnType<typeof getEventsFromReservation>;
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

        <div className="my-8 flex items-center gap-16 rounded-xl bg-white p-12 shadow-md">
          <div className="flex gap-8 font-link">
            <p className="text-4xl">{getUserLabel(userData)}</p>
            <Button>Edit profile</Button>
          </div>
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
