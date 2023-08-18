import { Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  name: string;
  label: string;
};

const Textfield = ({ name, label }: TextfieldProps) => {
  return (
    <>
      <div className="flex flex-col">
        <Label htmlFor={name}>{label}</Label>
        <Input name={name} placeholder={label} />
      </div>
    </>
  );
};

export default Textfield;
