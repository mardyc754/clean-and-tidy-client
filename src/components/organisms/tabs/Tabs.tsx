import clsx from 'clsx';

import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '~/components/shadcn/ui/tabs';

import { convertToCamelCase } from '~/utils/stringUtils';

export type TabsSlot = {
  name: string;
  content: () => JSX.Element;
};

type TabsProps = {
  slots: TabsSlot[];
  defaultTab?: string;
  tabsListClasses?: string;
};

const Tabs = ({ slots, tabsListClasses, defaultTab = '0' }: TabsProps) => {
  return (
    <ShadcnTabs
      defaultValue={defaultTab}
      className="flex w-full flex-col space-y-8"
    >
      <TabsList className={clsx(`grid w-full grid-cols-3`, tabsListClasses)}>
        {slots.map((slot, index) => (
          <TabsTrigger
            key={`${convertToCamelCase(slot.name)}-trigger-${index}}`}
            value={`${index}`}
          >
            {slot.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {slots.map((slot, index) => (
        <TabsContent
          key={`${convertToCamelCase(slot.name)}-content-${index}}`}
          value={`${index}`}
        >
          <slot.content />
          {/* {slot.Content} */}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};

export default Tabs;
