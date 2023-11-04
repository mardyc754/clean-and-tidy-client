import toast from 'react-hot-toast';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { login } from '~/api/auth';
import { hasError } from '~/api/handleFetchingData';

import { loginDataResolver, type LoginData } from '~/schemas/forms/auth';

import { Textfield } from '~/components/molecules/form-fields';
import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

interface LoginFormProps {
  redirectOnSuccessHandler?: () => Promise<void> | VoidFunction;
}

const LoginForm = ({ redirectOnSuccessHandler }: LoginFormProps) => {
  // const setUserData = useCurrentUserStore((state) => state.setUserData);

  const methods = useForm<LoginData>({ resolver: loginDataResolver });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setError
  } = methods;

  const onSubmit: SubmitHandler<LoginData> = async (values, e) => {
    e?.preventDefault();

    const { email, password } = values;

    const result = await login({ email, password });

    if (hasError(result)) {
      if (result.affectedField) {
        setError(result.affectedField, { message: result.message });
        return;
      }

      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    // setUserData(pick(result as LoginSuccessData, ['userId', 'email', 'role']));
    await redirectOnSuccessHandler?.();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid grid-rows-3 items-center gap-y-4 self-stretch px-16 py-8"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
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
