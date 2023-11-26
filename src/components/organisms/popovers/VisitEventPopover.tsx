import type { Placement } from '@floating-ui/react-dom';
import React from 'react';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { VisitDetailsList } from '../lists';
import BasicPopover from './BasicPopover';

interface VisitEventPopoverProps {
  name: React.ReactNode;
  data: VisitWithEmployees;
  placement?: Placement;
}

const VisitEventPopover = ({
  name,
  data,
  placement = 'right'
}: VisitEventPopoverProps) => {
  return (
    <BasicPopover
      buttonComponent={name}
      buttonClasses="w-full"
      placement={placement}
    >
      <VisitDetailsList data={data} />
    </BasicPopover>
  );
};

export default VisitEventPopover;
