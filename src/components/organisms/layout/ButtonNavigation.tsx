import NavigationButton, {
  type NavigationButtonProps
} from '~/components/atoms/buttons/NavigationButton';

type ButtonNavigationProps = {
  buttonData: NavigationButtonProps[];
};

const ButtonNavigation = ({ buttonData }: ButtonNavigationProps) => {
  return (
    <div className="m-0 flex w-full justify-between">
      {buttonData.map(({ name, navigateOnClickTo }) => (
        <NavigationButton
          key={`NavigationButton-${name}`}
          name={name}
          navigateOnClickTo={navigateOnClickTo}
          className="w-72 flex-1 py-4"
        />
      ))}
    </div>
  );
};

export default ButtonNavigation;
