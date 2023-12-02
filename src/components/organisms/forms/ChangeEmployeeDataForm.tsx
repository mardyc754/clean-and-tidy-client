import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { service } from '~/constants/queryKeys';

import { changeEmployeeServiceAssignment } from '~/api/employee';

import type { Employee } from '~/schemas/api/employee';
import type { ServiceWithEmployees } from '~/schemas/api/services';

import Button from '~/components/atoms/buttons/Button';
import { Checkbox } from '~/components/atoms/forms';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

interface ChangeEmployeeDataFormProps {
  employeeData: Employee;
  serviceData: ServiceWithEmployees[];
}

const ChangeEmployeeDataForm = ({
  employeeData,
  serviceData
}: ChangeEmployeeDataFormProps) => {
  const queryClient = useQueryClient();

  const primaryServices = serviceData.filter((service) => service.isPrimary);
  const secondaryServices = serviceData.filter((service) => !service.isPrimary);

  const methods = useForm({
    defaultValues: {
      employeeServices: Object.fromEntries(
        serviceData.map((service) => [
          `${service.id}`,
          service.employees?.some((employee) => employee.id === employeeData.id)
        ])
      )
    }
  });

  const mutation = useMutation({
    mutationFn: (serviceIds: number[]) =>
      changeEmployeeServiceAssignment(employeeData.id, serviceIds),
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: service.employeesWithFilters({ includeEmployee: true })
          });
        })(),
        {
          loading: 'Saving employee data changes',
          success: 'Save success',
          error: 'Failed to save employee data changes'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data, e) => {
          e?.preventDefault();
          mutation.mutate(
            Object.entries(data.employeeServices)
              .filter(([_, value]) => value)
              .map(([key, _]) => parseInt(key))
          );
        })}
      >
        <div className="max-h-[60vh] space-y-4 overflow-auto">
          <div className="flex flex-col space-y-4">
            <p className="font-emphasize text-lg">Services</p>
            <div>
              <div className="flex flex-col space-y-2">
                <p>Primary services</p>
                <div>
                  {primaryServices.map((service) => (
                    <Checkbox
                      key={`serviceDataCheckbox-${service.id}`}
                      name={`employeeServices.${service.id}`}
                      caption={service.name}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p>Secondary services</p>
                <div>
                  {secondaryServices.map((service) => (
                    <Checkbox
                      key={`serviceDataCheckbox-${service.id}`}
                      name={`employeeServices.${service.id}`}
                      caption={service.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default ChangeEmployeeDataForm;
