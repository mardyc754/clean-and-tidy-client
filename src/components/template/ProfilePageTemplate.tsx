import type { AuthenticatedUser } from '~/schemas/api/auth';

import { Heading1 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';

import { UserRole } from '~/types/enums';

import { UserProfileCard } from '../organisms/cards';
import { Tabs } from '../organisms/tabs';
import type { TabsSlot } from '../organisms/tabs/Tabs';

type ProfilePageTemplateProps = {
  slots: TabsSlot[];
  userRole: AuthenticatedUser['role'];
  defaultTab?: string;
};

const ProfilePageTemplate = ({
  slots,
  userRole,
  defaultTab = '0'
}: ProfilePageTemplateProps) => {
  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>
        <div className="py-8">
          <Tabs
            defaultTab={defaultTab}
            tabsListClasses={
              userRole === UserRole.ADMIN ? 'grid-cols-5' : 'grid-cols-3'
            }
            slots={[
              ...slots,
              {
                name: 'Profile Data',
                content: () => <UserProfileCard />
              }
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePageTemplate;
