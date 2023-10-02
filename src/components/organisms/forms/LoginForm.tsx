import * as Yup from 'yup';
import { Formik } from 'formik';

import { loginClient } from '~/api/auth';

import { Textfield } from '~/components/molecules/form-fields';
import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required')
    .max(40, 'Email is too long'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short')
    .max(32, 'Password is too long')
});

const LoginForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { email, password } = values;

          const result = await loginClient({ email, password });

          if (result && 'affectedField' in result) {
            setFieldError(result.affectedField!, result.message);
            return;
          }

          alert(result.message);
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting }) => (
          <form
            className="grid grid-rows-3 items-center gap-y-4 self-stretch px-16 py-8"
            onSubmit={handleSubmit}
          >
            <Textfield
              name="email"
              label="Email"
              type="email"
              onChange={handleChange}
              errorLabel={errors.email}
            />
            <Textfield
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              errorLabel={errors.password}
            />
            <SubmitButton name="Login" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
      <p>
        {`Don't have an account? `}
        <RegularLink href="/register">Register here</RegularLink>
      </p>
    </>
  );
};

export default LoginForm;
