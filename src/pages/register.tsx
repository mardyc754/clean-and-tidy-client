import { useRouter } from 'next/router';

import { FormPageTemplate } from '~/components/template';
import { RegistrationForm } from '~/components/organisms/forms';

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

export default Register;
