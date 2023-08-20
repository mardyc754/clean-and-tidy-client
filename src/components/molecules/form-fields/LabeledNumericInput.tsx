import type { NumericInputProps } from '~/components/atoms/forms/NumericInput';
import { NumericInput, Label } from '~/components/atoms/forms';

type LabeledNumericInputProps = {
  label: string;
} & NumericInputProps;

const LabeledNumericInput = ({
  name,
  label,
  value,
  setValue,
  className,
  ...props
}: LabeledNumericInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <NumericInput name={name} value={value} setValue={setValue} {...props} />
    </div>
  );
};

export default LabeledNumericInput;
