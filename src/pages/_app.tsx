import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { type AppType } from 'next/app';

import '~/styles/globals.css';
import '~/styles/Calendar.css';

config.autoAddCss = false;
library.add(fas);

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default MyApp;
