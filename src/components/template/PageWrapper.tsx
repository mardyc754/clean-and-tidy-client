import Head from 'next/head';
import { Footer, Navbar } from '../organisms/layout';
import { useAuth } from '~/hooks/auth/useAuth';
import { PageLoader } from '../molecules/status-indicators';

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
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
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
