import toast from 'react-hot-toast';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { register } from '~/api/auth';

import { Textfield } from '~/components/molecules/form-fields';

import {
  registrationDataResolver,
  type RegistrationData
} from '~/schemas/forms/auth';

import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

interface RegistrationFormProps {
  redirectOnSuccessHandler?: () => Promise<void>;
}

const RegistrationForm = ({
  redirectOnSuccessHandler
}: RegistrationFormProps) => {
  const methods = useForm<RegistrationData>({
    resolver: registrationDataResolver
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setError
  } = methods;

  const onSubmit: SubmitHandler<RegistrationData> = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      const doNotMatchMessage = 'Passwords do not match';
      setError('password', { message: doNotMatchMessage });
      setError('confirmPassword', { message: doNotMatchMessage });
      return;
    }

    const result = await register({ username, email, password });

    if (result && 'affectedField' in result) {
      setError(result.affectedField!, { message: result.message });
      return;
    }

    toast(result.message);

    if (!('hasError' in result)) {
      await redirectOnSuccessHandler?.();
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid grid-rows-5 items-center gap-y-4 self-stretch px-16 py-8"
          onSubmit={handleSubmit(onSubmit)}
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
