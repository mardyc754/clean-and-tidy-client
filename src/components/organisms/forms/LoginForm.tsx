import { Textfield } from '~/components/molecules/form-fields';
import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

const LoginForm = () => {
  return (
    <>
      <form className="grid grid-rows-3 items-center gap-y-4 self-stretch px-16 py-8">
        <Textfield name="username" label="Username" />
        <Textfield name="password" label="Password" type="password" />
        <SubmitButton name="Login" />
      </form>
      <p>
        {`Don't have an account? `}
        <RegularLink href="/register">Register here</RegularLink>
      </p>
    </>
  );
};

export default LoginForm;