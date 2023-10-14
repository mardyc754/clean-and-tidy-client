import { useShallow } from 'zustand/react/shallow';

import { useOrderServiceDataStore } from '~/stores';

import { type BasicServiceData } from '~/api/schemas/services';

import NumericInput, {
  type NumericInputProps
} from '~/components/atoms/forms/NumericInput';

import LabeledNumericInput from './LabeledNumericInput';

type OrderServiceNumericInputProps = Omit<
  NumericInputProps,
  'onChange' | 'onIncreaseValue' | 'onDecreaseValue' | 'value'
> & {
  serviceData: BasicServiceData;
  isMainServiceControl?: boolean;
  label?: string;
};

const OrderServiceNumericInput = ({
  serviceData,
  isMainServiceControl = false,
  label,
  ...props
}: OrderServiceNumericInputProps) => {
  const {
    orderService,
    cancelOrderingService,
    changeNumberOfUnits,
    getServiceNumberOfUnits
  } = useOrderServiceDataStore(
    useShallow((state) => ({
      orderService: state.orderService,
      cancelOrderingService: state.cancelOrderingService,
      orderedServices: state.orderedServices,
      changeNumberOfUnits: state.changeNumberOfUnits,
      getServiceNumberOfUnits: state.getServiceNumberOfUnits
    }))
  );

  const Component = label ? LabeledNumericInput : NumericInput;

  return (
    <Component
      {...props}
      label={label ?? ''}
      value={getServiceNumberOfUnits(serviceData.id)}
      onChange={(value) =>
        changeNumberOfUnits(value, serviceData, isMainServiceControl)
      }
      onIncreaseValue={() => orderService(serviceData, isMainServiceControl)}
      onDecreaseValue={() => cancelOrderingService(serviceData.id)}
    />
  );
};

export default OrderServiceNumericInput;
