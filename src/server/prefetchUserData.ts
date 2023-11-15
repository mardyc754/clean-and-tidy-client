import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { GetServerSidePropsContext } from 'next';

import { user } from '~/constants/queryKeys';

import { fetcher } from '~/lib/axios';

import type { User } from '~/schemas/api/auth';

// export const withCurrentUserData = <T extends Record<string, unknown>>(
//   getServerSidePropsFunc?: GetServerSideProps<T>
// ) => {
//   return async (context: GetServerSidePropsContext) => {
//     const queryClient = new QueryClient();

//     const req = context.req;

//     await queryClient.prefetchQuery({
//       // eslint-disable-next-line @tanstack/query/exhaustive-deps
//       queryKey: user,
//       queryFn: async () => {
//         const res = await fetcher.get<AxiosResponse<User>>('auth/user', {
//           withCredentials: true,
//           headers: {
//             Cookie: req.headers.cookie
//           }
//         });

//         return res.data;
//       }
//     });

//     if (getServerSidePropsFunc) {
//       const getServerSidePropsFuncData = await getServerSidePropsFunc(context);

//       if ('props' in getServerSidePropsFuncData) {
//         return {
//           props: {
//             ...(await getServerSidePropsFuncData.props),
//             dehydratedState: dehydrate(queryClient)
//           }
//         };
//       }
//     }

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient)
//       }
//     };
//   };
// };

export const prefetchUserData = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const req = context.req;

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: user,
    queryFn: async () => {
      const res = await fetcher.get<AxiosResponse<User>>('auth/user', {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
      });

      return res.data;
    }
  });

  return {
    dehydratedState: dehydrate(queryClient)
  };
};

export const fetchUserData = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const req = context.req;

  let userData: User | undefined;
  try {
    userData = await queryClient.fetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: user,
      queryFn: async () => {
        const res = await fetcher.get<AxiosResponse<User>>('auth/user', {
          withCredentials: true,
          headers: {
            Cookie: req.headers.cookie
          }
        });

        return res.data;
      }
    });
  } catch (error) {
    console.error(error);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    userData
  };
};

export const getServerSideUserData = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await prefetchUserData(context))
    }
  };
};

// satisfies GetServerSideProps<{
//   data: Service[];
//   dehydratedState: DehydratedState;
// }
