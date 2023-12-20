import { useContext } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { getStatusFromVisitParts } from '~/utils/visitUtils';

import { Status } from '~/types/enums';

import { CancelVisitButton, ChangeVisitDateButton } from '../dialogs';

const VisitActions = () => {
  const { visitData } = useContext(VisitDataContext);

  const visitStatus = getStatusFromVisitParts(visitData?.visitParts ?? []);

  return (
    <>
      <ChangeVisitDateButton disabled={!visitData?.canDateBeChanged} />
      <CancelVisitButton
        disabled={
          !visitData ||
          [Status.CANCELLED, Status.CLOSED, Status.UNKNOWN].includes(
            visitStatus
          )
        }
      />
    </>
  );
};

export default VisitActions;
