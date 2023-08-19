import { Textfield } from '~/components/molecules/form-fields';

import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

const RegistrationForm = () => {
  return (
    <>
      <form className="grid grid-rows-5 items-center gap-y-4 self-stretch px-16 py-8">
        <Textfield name="username" label="Username" />
        <Textfield name="email" label="Email" type="email" />
        <Textfield name="password" label="Password" type="password" />
        <Textfield
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <SubmitButton name="Register" />
      </form>
      <p>
        {`Already have an account? `}
        <RegularLink href="/login">Login here</RegularLink>
      </p>
    </>
  );
};

export default RegistrationForm;
