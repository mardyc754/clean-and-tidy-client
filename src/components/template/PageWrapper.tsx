import Head from 'next/head';

import { useAuth } from '~/hooks/auth/useAuth';

import { PageLoader } from '../molecules/status-indicators';
import { Footer, Navbar } from '../organisms/layout';

export type PageWrapperProps = {
  title: string;
  children?: React.ReactNode;
};

const PageWrapper = ({ title, children }: PageWrapperProps) => {
  const { isSuccess } = useAuth();

  return (
    <>
      <Head>
        <title>{`${title} | Clean and Tidy`}</title>
        <meta name="description" content="Professional cleaning services" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <PageLoader isSuccess={isSuccess}>
        {() => (
          <>
            <Navbar />
            <main className="flex min-h-screen flex-col bg-sky-100">
              {children}
            </main>
            <Footer />
          </>
        )}
      </PageLoader>
    </>
  );
};

export default PageWrapper;
