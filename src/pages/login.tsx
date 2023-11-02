import { useRouter } from 'next/router';

import { FormPageTemplate } from '~/components/template';
import { LoginForm } from '~/components/organisms/forms';

const Login = () => {
  const router = useRouter();

  return (
    <FormPageTemplate title="Login" headingTitle="Login">
      <LoginForm
        redirectOnSuccessHandler={async () => {
          await router.push('/');
        }}
      />
    </FormPageTemplate>
  );
};

export default Login;
