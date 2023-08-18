import { FooterButton } from '../atoms/buttons';

const FooterButtons = () => {
  return (
    <div className="flex w-full justify-evenly p-10">
      <FooterButton
        name="For home"
        onClick={() => {
          /** TODO */
        }}
      />
      <FooterButton
        name="For office"
        onClick={() => {
          /** TODO */
        }}
      />
      <FooterButton
        name="Registration"
        onClick={() => {
          /** TODO */
        }}
      />
    </div>
  );
};

export default FooterButtons;
