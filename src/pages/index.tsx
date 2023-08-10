import { PageWrapper } from '~/components/template';
import { HeroSection } from '~/components/organisms';
import { Dropdown } from '~/components/molecules';

const Home = () => {
  return (
    <PageWrapper title="Clean and Tide">
      <HeroSection />
      <div>
        <Dropdown />
      </div>
    </PageWrapper>
  );
};

export default Home;
