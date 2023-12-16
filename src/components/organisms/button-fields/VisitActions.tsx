import { useContext } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { getStatusFromVisitParts } from '~/utils/visitUtils';

import { Status } from '~/types/enums';

import { CancelVisitButton, ChangeVisitDateButton } from '../dialogs';
import { SecondaryListWrapper } from '../wrappers';

const VisitActions = () => {
  const { visitData } = useContext(VisitDataContext);

  const visitStatus = getStatusFromVisitParts(visitData?.visitParts ?? []);

  return (
    <SecondaryListWrapper title="Actions">
      <div className="flex space-x-4">
        <ChangeVisitDateButton disabled={!visitData?.canDateBeChanged} />
        <CancelVisitButton
          disabled={
            !visitData ||
            [Status.CANCELLED, Status.CLOSED, Status.UNKNOWN].includes(
              visitStatus
            )
          }
        />
      </div>
    </SecondaryListWrapper>
  );
};

export default VisitActions;
