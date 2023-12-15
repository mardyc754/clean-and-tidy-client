import clsx from 'clsx';

import Button, { type ButtonProps } from '~/components/atoms/buttons/Button';
// import { Button } from '~/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger as DialogTriggerBase
} from '~/components/shadcn/ui/dialog';

interface DialogTriggerButtonProps extends ButtonProps {
  buttonLabel: string;
  className?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children: React.ReactNode;
  actions?: ButtonProps[];
}

// const DialogTriggerButton = () => {
//   return (
//     <Dialog>
//       <DialogTriggerBase asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTriggerBase>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

const DialogTriggerButton = ({
  buttonLabel,
  dialogTitle,
  dialogDescription,
  className,
  children,
  ...props
}: // actions
DialogTriggerButtonProps) => {
  return (
    <Dialog>
      <DialogTriggerBase asChild>
        <Button {...props}>{buttonLabel}</Button>
      </DialogTriggerBase>
      <DialogContent className={clsx('sm:max-w-[425px]', className)}>
        <DialogHeader>
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          {actions?.map(({ children, ...otherProps }, i) => (
            <Button key={`dialogTriggerButton-action-${i}`} {...otherProps}>
              {children}
            </Button>
          ))}
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default DialogTriggerButton;
