import type { GetServerSidePropsContext } from 'next';

export const getIsSsrMobile = (context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers['user-agent'];
  const isMobile = userAgent
    ? Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
    : false;

  return isMobile;
};
