import { Button } from '~/components/atoms/buttons';

import { ListWrapper } from '../wrappers';

const ReservationActions = () => {
  return (
    <ListWrapper title="Actions">
      <div className="flex space-x-4 pt-4">
        <Button>Change reservation general data</Button>
        <Button color="danger">Cancel reservation</Button>
      </div>
    </ListWrapper>
  );
};

export default ReservationActions;
