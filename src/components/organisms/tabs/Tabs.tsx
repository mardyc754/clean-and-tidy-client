import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '~/components/shadcn/ui/tabs';

import { convertToCamelCase } from '~/utils/stringUtils';

export type TabsSlot = {
  name: string;
  Content: () => JSX.Element;
};

type TabsProps = {
  slots: TabsSlot[];
};

const Tabs = ({ slots }: TabsProps) => {
  return (
    <ShadcnTabs defaultValue="0" className="flex w-full flex-col space-y-8">
      <TabsList className={`grid w-full grid-cols-${slots.length}`}>
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
          <slot.Content />
          {/* {slot.Content} */}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};

export default Tabs;
