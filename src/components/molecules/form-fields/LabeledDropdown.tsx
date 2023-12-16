import Dropdown, { type DropdownProps } from './Dropdown';

type LabeledDropdownProps<T> = {
  label: string;
} & DropdownProps<T>;

const LabeledDropdown = <T,>({ label, ...props }: LabeledDropdownProps<T>) => {
  return (
    <div className="flex items-center space-x-4">
      <p>{label}</p>
      <Dropdown {...props} />
    </div>
  );
};

export default LabeledDropdown;
