import * as Yup from 'yup';
import { Formik } from 'formik';

import { register } from '~/api/auth';

import { Textfield } from '~/components/molecules/form-fields';

import { SubmitButton } from '~/components/atoms/buttons';
import { RegularLink } from '~/components/atoms/links';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username is too short')
    .max(30, 'Username is too long'),
  email: Yup.string()
    .email()
    .required('Email is required')
    .max(40, 'Email is too long'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short')
    .max(32, 'Password is too long'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short')
    .max(32, 'Password is too long')
});

const RegistrationForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError, setErrors }) => {
          const { username, email, password, confirmPassword } = values;

          if (password !== confirmPassword) {
            const doNotMatchMessage = 'Passwords do not match';
            setErrors({
              password: doNotMatchMessage,
              confirmPassword: doNotMatchMessage
            });
            return;
          }

          const result = await register({ username, email, password });

          if (result && 'affectedField' in result) {
            setFieldError(result.affectedField!, result.message);
            return;
          }

          alert(result.message);
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting }) => (
          <form
            className="grid grid-rows-5 items-center gap-y-4 self-stretch px-16 py-8"
            onSubmit={handleSubmit}
          >
            <Textfield
              name="username"
              label="Username"
              errorLabel={errors.username}
              onChange={handleChange}
            />
            <Textfield
              name="email"
              label="Email"
              type="email"
              errorLabel={errors.email}
              onChange={handleChange}
            />
            <Textfield
              name="password"
              label="Password"
              type="password"
              errorLabel={errors.password}
              onChange={handleChange}
            />
            <Textfield
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              errorLabel={errors.confirmPassword}
              onChange={handleChange}
            />
            <SubmitButton name="Register" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
      <p>
        {`Already have an account? `}
        <RegularLink href="/login">Login here</RegularLink>
      </p>
    </>
  );
};

export default RegistrationForm;
