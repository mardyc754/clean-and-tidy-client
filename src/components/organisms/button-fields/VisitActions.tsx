import { Button } from '~/components/atoms/buttons';

import { CancelVisitButton, ChangeVisitDateButton } from '../dialogs';
import { SecondaryListWrapper } from '../wrappers';

const VisitActions = () => {
  return (
    <SecondaryListWrapper title="Actions">
      <div className="flex space-x-4">
        <ChangeVisitDateButton />
        {/* <Button color="danger">Cancel visit</Button> */}
        <CancelVisitButton />
      </div>
    </SecondaryListWrapper>
  );
};

export default VisitActions;
