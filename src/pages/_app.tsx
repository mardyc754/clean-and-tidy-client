import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';

import '~/styles/globals.css';
import '~/styles/Calendar.css';

config.autoAddCss = false;
library.add(fas);

// const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
//   const { isLoading } = useAuth();

//   return isLoading ? null : <>{children}</>;
// };

const MyApp: AppType<{
  session: Session | null;
  dehydratedState: DehydratedState;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster
            toastOptions={
              {
                // success: {
                //   style: {
                //     background: 'green',
                //     color: 'white'
                //   }
                // },
                // error: {
                //   style: {
                //     background: 'red',
                //     color: 'white'
                //   },
                //   iconTheme: {
                //     primary: 'white',
                //     secondary: 'red'
                //   }
                // }
              }
            }
          />
        </SessionProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
