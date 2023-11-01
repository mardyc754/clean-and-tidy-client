import { Button } from '~/components/atoms/buttons';
import { type NavigationButtonProps } from '~/components/atoms/buttons/NavigationButton';

type ButtonNavigationProps = {
  buttonData: NavigationButtonProps[];
};

const ButtonNavigation = ({ buttonData }: ButtonNavigationProps) => {
  return (
    <div className="m-0 flex w-full justify-between">
      {buttonData.map(({ name, navigateOnClickTo }) => (
        <Button
          key={`NavigationButton-${name}`}
          name={name}
          href={navigateOnClickTo}
          className="w-72 flex-1 py-4"
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default ButtonNavigation;
