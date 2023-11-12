import { Button } from '~/components/atoms/buttons';

import { SecondaryListWrapper } from '../wrappers';

const VisitActions = () => {
  return (
    <SecondaryListWrapper title="Actions">
      <div className="flex space-x-4">
        <Button
        // href={`/visits/${data.id}/change`}
        >
          Change the date
        </Button>
        <Button color="danger">Cancel visit</Button>
      </div>
    </SecondaryListWrapper>
  );
};

export default VisitActions;
