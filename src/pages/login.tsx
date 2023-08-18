import { FormPageTemplate } from '~/components/template';
import { LoginForm } from '~/components/organisms/forms';

const Login = () => {
  return (
    <FormPageTemplate title="Login" headingTitle="Login">
      <LoginForm />
    </FormPageTemplate>
  );
};

export default Login;
