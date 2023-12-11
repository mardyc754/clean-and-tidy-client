import { useContext } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';

import { ChangeVisitDateButton } from '../dialogs';
import { SecondaryListWrapper } from '../wrappers';

const VisitActions = () => {
  return (
    <SecondaryListWrapper title="Actions">
      <div className="flex space-x-4">
        <ChangeVisitDateButton />
        <Button color="danger">Cancel visit</Button>
      </div>
    </SecondaryListWrapper>
  );
};

export default VisitActions;
