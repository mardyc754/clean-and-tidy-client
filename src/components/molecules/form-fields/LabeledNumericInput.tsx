import type { NumericInputProps } from '~/components/atoms/forms/NumericInput';
import { NumericInput, Label } from '~/components/atoms/forms';

export type LabeledNumericInputProps = {
  label: string;
} & NumericInputProps;

const LabeledNumericInput = ({
  name,
  label,
  value,
  className,
  ...props
}: LabeledNumericInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <NumericInput name={name} value={value} {...props} />
    </div>
  );
};

export default LabeledNumericInput;
