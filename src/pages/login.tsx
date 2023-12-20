import { useRouter } from 'next/router';

import { getServerSideUserData } from '~/server/prefetchUserData';

import { RegularLink } from '~/components/atoms/links';
import { LoginForm } from '~/components/organisms/forms';
import { FormPageTemplate } from '~/components/template';

const Login = () => {
  const router = useRouter();

  return (
    <FormPageTemplate
      title="Login"
      headingTitle="Login"
      descriptionComponent={
        <p>
          {`Don't have an account? `}
          <RegularLink href="/register">Register here</RegularLink>
        </p>
      }
    >
      <LoginForm
        redirectOnSuccessHandler={async () => {
          await router.push('/');
        }}
      />
    </FormPageTemplate>
  );
};

export const getServerSideProps = getServerSideUserData;

export default Login;
