import { FormProvider } from 'react-hook-form';

import { Textfield } from '~/components/molecules/form-fields';
import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';
import { useRegister } from '~/hooks/auth/useRegister';

interface RegistrationFormProps {
  redirectOnSuccessHandler?: () => Promise<void>;
}

const RegistrationForm = ({
  redirectOnSuccessHandler
}: RegistrationFormProps) => {
  const { onSubmit, methods } = useRegister({ redirectOnSuccessHandler });

  const {
    formState: { errors, isSubmitting }
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid grid-rows-5 items-center gap-y-4 self-stretch px-16 py-8"
          onSubmit={onSubmit}
        >
          <Textfield
            name="username"
            label="Username"
            errorLabel={errors.username?.message}
          />
          <Textfield
            name="email"
            label="Email"
            type="email"
            errorLabel={errors.email?.message}
          />
          <Textfield
            name="password"
            label="Password"
            type="password"
            errorLabel={errors.password?.message}
          />
          <Textfield
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            errorLabel={errors.confirmPassword?.message}
          />
          <SubmitButton name="Register" disabled={isSubmitting} />
        </form>
      </FormProvider>

      <p>
        {`Already have an account? `}
        <RegularLink href="/login">Login here</RegularLink>
      </p>
    </>
  );
};

export default RegistrationForm;
