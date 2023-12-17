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

export interface DialogTriggerButtonProps extends ButtonProps {
  buttonLabel: string;
  className?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children: React.ReactNode;
  actions?: ButtonProps[];
}

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
      <DialogContent className={clsx('sm:max-w-4xl', className)}>
        <DialogHeader>
          {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogTriggerButton;
