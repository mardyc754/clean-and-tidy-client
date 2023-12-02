import { useRouter } from 'next/router';

export function useOrderServiceFormNavigation() {
  const router = useRouter();

  const onChangeStep = async (newStep: number) => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, currentStep: newStep }
    });
  };

  const returnToHomePage = async () => {
    await router.push('/');
  };

  return { onChangeStep, returnToHomePage };
}
