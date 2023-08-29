import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Portal } from '@headlessui/react';
import { Button } from '~/components/atoms/buttons';

type DialogBaseProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  showDescription?: boolean;
  children: React.ReactNode;
  title: string;
};

const DialogBase = ({
  isOpen,
  onClose,
  showDescription = false,
  children,
  title
}: DialogBaseProps) => {
  return (
    <Portal>
      <Dialog open={isOpen} onClose={onClose}>
        {/* grey out the area outside the dialog */}
        <div className="fixed top-0 h-full w-full bg-black opacity-30" />
        {/* dialog wrapper */}
        <Dialog.Panel className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-0">
          {/* dialog title */}
          <div className="flex items-center justify-between border-b-2 px-8 py-4">
            <Dialog.Title className="font-emphasize text-2xl">
              {title}
            </Dialog.Title>
            <FontAwesomeIcon
              className="cursor-pointer text-xl"
              onClick={onClose}
              icon={faXmark}
            />
          </div>
          {/* dialog content */}
          {showDescription && (
            <div className="px-8 pt-4">
              <Dialog.Description className="text-center font-link text-red-600">
                This will permanently deactivate your account
              </Dialog.Description>
            </div>
          )}
          <div className="px-8 py-4">{children}</div>
          {/* dialog actions */}
          <div className="flex justify-between px-8 py-4">
            <Button onClick={onClose} name="Deactivate" />
            <Button onClick={onClose} name="Cancel" />
          </div>
        </Dialog.Panel>
      </Dialog>
    </Portal>
  );
};

export default DialogBase;
