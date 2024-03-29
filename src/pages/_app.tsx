import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppType } from 'next/app';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Toaster } from 'react-hot-toast';
import { IsSsrMobileContext } from '~/providers/IsMobileContext';

import '~/styles/globals.css';

config.autoAddCss = false;
library.add(fas);

const MyApp: AppType<{
  dehydratedState: DehydratedState;
  isSsrMobile: boolean;
}> = ({ Component, pageProps: { ...pageProps } }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 600 * 1000
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
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
        </IsSsrMobileContext.Provider>
      </HydrationBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default MyApp;
