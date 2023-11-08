import { Spinner } from '~/components/molecules/status-indicators';

type QueryLoaderProps = {
  isSuccess: boolean;
  children: () => React.ReactElement;
};

const PageLoader = ({ isSuccess, children }: QueryLoaderProps) => {
  return isSuccess ? (
    children()
  ) : (
    <Spinner
      size="medium"
      caption="Loading..."
      className="h-[100vh] justify-center"
    />
  );
};

export default PageLoader;
