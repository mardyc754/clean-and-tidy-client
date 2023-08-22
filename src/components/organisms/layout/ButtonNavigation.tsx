import NavigationButton, {
  type NavigationButtonProps
} from '~/components/atoms/buttons/NavigationButton';

type ButtonNavigationProps = {
  buttonData: NavigationButtonProps[];
};

const ButtonNavigation = ({ buttonData }: ButtonNavigationProps) => {
  return (
    <div className="flex justify-between">
      {buttonData.map(({ name, navigateOnClickTo }) => (
        <NavigationButton
          key={`NavigationButton-${name}`}
          name={name}
          navigateOnClickTo={navigateOnClickTo}
        />
      ))}
    </div>
  );
};

export default ButtonNavigation;
