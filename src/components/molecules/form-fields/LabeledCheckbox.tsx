import Checkbox, {
  type CheckboxProps
} from '~/components/atoms/forms/Checkbox';
import { Label } from '~/components/atoms/forms';
import { SmallTypography } from '~/components/atoms/typography/regular-text';

type LabeledCheckboxProps = {
  label?: string;
  caption: string;
  onChangeChecked: VoidFunction;
} & CheckboxProps;

const LabeledCheckbox = ({
  label,
  caption,
  name,
  checked,
  onChangeChecked,
  className,
  ...props
}: LabeledCheckboxProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="flex items-center">
        <Checkbox
          name={name}
          checked={checked}
          onChangeChecked={onChangeChecked}
          {...props}
        />
        <div className="px-2">
          <SmallTypography>{caption}</SmallTypography>
        </div>
      </div>
    </div>
  );
};

export default LabeledCheckbox;
