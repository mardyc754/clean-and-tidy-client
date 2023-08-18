import Image from 'next/image';
import FormPageImage from '~/assets/couch.jpg';

import { Heading1 } from '~/components/atoms/typography/headings';
import { LoginForm } from '~/components/organisms/forms';
import { PageWrapper } from '~/components/template';

const Login = () => {
  return (
    <PageWrapper title="Login">
      <div className="flex flex-1">
        <div className="relative flex w-1/2 bg-blue-950">
          <Image
            alt="Living room"
            src={FormPageImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              filter: 'brightness(0.7)'
            }}
          />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center">
          <div className="p-4">
            <Heading1>Login</Heading1>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
