import { FooterButton } from '../atoms/buttons';

const FooterButtons = () => {
  return (
    <div className="flex w-full justify-evenly p-10">
      <FooterButton name="For home" />
      <FooterButton name="For office" />
      <FooterButton name="Registration" />
    </div>
  );
};

export default FooterButtons;
