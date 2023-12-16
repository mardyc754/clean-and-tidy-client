import { FormProvider } from 'react-hook-form';

import { useRegister } from '~/hooks/auth/useRegister';

import { Button } from '~/components/atoms/buttons';
import { Textfield } from '~/components/molecules/form-fields';

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
    <FormProvider {...methods}>
      <form
        className="grid w-full max-w-lg grid-rows-4 items-center space-y-1 px-16 py-8"
        onSubmit={onSubmit}
      >
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
        <div className="flex items-center justify-center py-4">
          <Button type="submit" disabled={isSubmitting} className="w-40">
            Register
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
