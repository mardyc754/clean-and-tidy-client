import { useRouter } from 'next/router';

import { getServerSideUserData } from '~/server/prefetchUserData';

import { RegistrationForm } from '~/components/organisms/forms';
import { FormPageTemplate } from '~/components/template';

const Register = () => {
  const router = useRouter();

  return (
    <FormPageTemplate title="Register" headingTitle="Register">
      <RegistrationForm
        redirectOnSuccessHandler={async () => {
          await router.push('/login');
        }}
      />
    </FormPageTemplate>
  );
};

export const getServerSideProps = getServerSideUserData;

export default Register;
