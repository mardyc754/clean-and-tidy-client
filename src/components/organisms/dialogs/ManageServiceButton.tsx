import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { service } from '~/constants/queryKeys';

import { changeServiceData } from '~/api/services';

import type { Service } from '~/schemas/api/services';
import {
  type UpdateServiceData,
  updateServiceResolver
} from '~/schemas/forms/admin';

import { Button } from '~/components/atoms/buttons';
import { Textfield } from '~/components/molecules/form-fields';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import { getLabelForServiceUnit } from '~/utils/serviceUtils';

import DialogTriggerButton from './DialogTriggerButton';

interface ManageServiceButtonProps {
  serviceData: Service;
}

const ManageServiceButton = ({ serviceData }: ManageServiceButtonProps) => {
  const queryClient = useQueryClient();

  const { unit, name } = serviceData;

  const methods = useForm({
    defaultValues: {
      unit: {
        price: unit ? unit.price : 0
      }
    },
    resolver: updateServiceResolver
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const mutation = useMutation({
    mutationFn: (data: UpdateServiceData) =>
      changeServiceData(serviceData.id, data),
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: service.employeesWithFilters({ includeEmployee: true })
          });
        })(),
        {
          loading: 'Saving service data',
          success: 'Save success',
          error: 'Failed to save service data'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <DialogTriggerButton
      className="sm:max-w-[40vw]"
      dialogTitle={`Change ${name} unit price`}
      buttonLabel="Manage"
      actions={[{ children: 'Save changes', type: 'submit' }]}
    >
      <FormProvider {...methods}>
        <form
          key={`service-${serviceData.id}`}
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();
            e?.preventDefault();
            mutation.mutate(data);
          })}
        >
          <p>{`Old service price: ${getLabelForServiceUnit(serviceData)}`}</p>
          {/* <NumericInput name={`unit.price`} min={1} label="New service price" /> */}
          <Textfield
            name={`unit.price`}
            label="New service price"
            errorLabel={errors.unit?.price?.message}
          />
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </FormProvider>
      {/* <ChangeServiceDataForm serviceData={serviceData} /> */}
    </DialogTriggerButton>
  );
};

export default ManageServiceButton;
