import { FormPageTemplate } from '~/components/template';
import { RegistrationForm } from '~/components/organisms/forms';

const Register = () => {
  return (
    <FormPageTemplate title="Register" headingTitle="Register">
      <RegistrationForm />
    </FormPageTemplate>
  );
};

export default Register;
