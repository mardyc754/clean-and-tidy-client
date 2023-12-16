import { useRouter } from 'next/router';

import { getServerSideUserData } from '~/server/prefetchUserData';

import { RegularLink } from '~/components/atoms/links';
import { RegistrationForm } from '~/components/organisms/forms';
import { FormPageTemplate } from '~/components/template';

const Register = () => {
  const router = useRouter();
  RegularLink;
  return (
    <FormPageTemplate
      title="Register"
      headingTitle="Register"
      descriptionComponent={
        <p>
          {`Already have an account? `}
          <RegularLink href="/login">Login here</RegularLink>
        </p>
      }
    >
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
