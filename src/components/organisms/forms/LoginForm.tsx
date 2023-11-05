import { FormProvider } from 'react-hook-form';

import { useLogin } from '~/hooks/auth/useLogin';

import { Textfield } from '~/components/molecules/form-fields';
import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

interface LoginFormProps {
  redirectOnSuccessHandler?: () => Promise<void> | VoidFunction;
}

const LoginForm = ({ redirectOnSuccessHandler }: LoginFormProps) => {
  const { methods, onSubmit } = useLogin({ redirectOnSuccessHandler });

  const {
    formState: { errors, isSubmitting }
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid grid-rows-3 items-center gap-y-4 self-stretch px-16 py-8"
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
          <SubmitButton name="Login" disabled={isSubmitting} />
        </form>
      </FormProvider>
      <p>
        {`Don't have an account? `}
        <RegularLink href="/register">Register here</RegularLink>
      </p>
    </>
  );
};

export default LoginForm;
