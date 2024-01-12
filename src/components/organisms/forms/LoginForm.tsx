import { FormProvider } from 'react-hook-form';

import { useLogin } from '~/hooks/auth/useLogin';

import { Button } from '~/components/atoms/buttons';
import { Textfield } from '~/components/molecules/form-fields';

interface LoginFormProps {
  redirectOnSuccessHandler?: () => Promise<void> | VoidFunction;
}

const LoginForm = ({ redirectOnSuccessHandler }: LoginFormProps) => {
  const { methods, onSubmit } = useLogin({ redirectOnSuccessHandler });

  const {
    formState: { errors, isSubmitting }
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="grid w-full max-w-lg grid-rows-3 items-center space-y-1 px-16 py-8"
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
        <div className="flex items-center justify-center py-4">
          <Button type="submit" disabled={isSubmitting} className="w-40">
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
