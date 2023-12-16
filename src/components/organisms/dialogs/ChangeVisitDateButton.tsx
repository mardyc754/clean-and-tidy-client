import { DialogTriggerButton } from '.';
import { ChangeVisitDateForm } from '../forms';
import type { DialogTriggerButtonProps } from './DialogTriggerButton';

const ChangeVisitDateButton = (
  props: Omit<DialogTriggerButtonProps, 'buttonLabel' | 'children'>
) => {
  return (
    <DialogTriggerButton
      {...props}
      className="sm:max-w-[60vw]"
      dialogTitle="Change the visit date"
      buttonLabel="Change the date"
      actions={[
        {
          children: 'Save changes',
          type: 'submit'
        }
      ]}
    >
      <ChangeVisitDateForm />
    </DialogTriggerButton>
  );
};

export default ChangeVisitDateButton;
