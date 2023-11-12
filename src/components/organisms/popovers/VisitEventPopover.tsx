import React from 'react';
import type { Placement } from '@floating-ui/react-dom';

import type { Visit } from '~/schemas/api/reservation';

import BasicPopover from './BasicPopover';
import { VisitDetailsList } from '../lists';

interface VisitEventPopoverProps {
  name: React.ReactNode;
  data: Visit;
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
