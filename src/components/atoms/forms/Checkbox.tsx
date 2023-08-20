import { type InputHTMLAttributes } from 'react';
import type { SetRequired } from 'type-fest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export type CheckboxProps = {
  onChangeChecked: VoidFunction;
} & SetRequired<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
  'checked' | 'name'
>;

const Checkbox = ({ checked, onChangeChecked, ...props }: CheckboxProps) => {
  const wrapperStyle = checked
    ? 'bg-cyan-500'
    : 'border-2 border-cyan-500 bg-transparent';

  return (
    <div className={`relative h-6 w-6 rounded-lg ${wrapperStyle}`}>
      {checked && (
        <div
          className="absolute left-0 top-0 flex h-6 w-6 place-content-center"
          aria-hidden="true"
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="h-4 w-4 place-self-center text-white"
            aria-hidden="true"
          />
        </div>
      )}
      <input
        type="checkbox"
        className="absolute top-0 h-6 w-6 cursor-pointer appearance-none rounded-lg"
        defaultChecked={checked}
        onClick={onChangeChecked}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
