import { DialogTriggerButton } from '.';
import { ChangeVisitDateForm } from '../forms';

const ChangeVisitDateButton = () => {
  return (
    <DialogTriggerButton
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
