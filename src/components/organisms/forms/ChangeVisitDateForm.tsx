import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { service } from '~/constants/queryKeys';

import { changeEmployeeServiceAssignment } from '~/api/employee';

import type { Employee } from '~/schemas/api/employee';
import { VisitWithEmployees } from '~/schemas/api/reservation';
import type { ServiceWithEmployees } from '~/schemas/api/services';

import Button from '~/components/atoms/buttons/Button';
import { Checkbox } from '~/components/atoms/forms';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import { displayDateWithHours } from '~/utils/dateUtils';

import { CalendarWithHours } from '../form-fields';

const ChangeVisitDateForm = () => {
  const { visitData } = useContext(VisitDataContext);
  const visitStartDate = visitData?.visitParts[0]!.startDate;

  // const queryClient = useQueryClient();

  // const primaryServices = serviceData.filter((service) => service.isPrimary);
  // const secondaryServices = serviceData.filter((service) => !service.isPrimary);

  // const methods = useForm({
  //   defaultValues: {
  //     employeeServices: Object.fromEntries(
  //       serviceData.map((service) => [
  //         `${service.id}`,
  //         service.employees?.some((employee) => employee.id === employeeData.id)
  //       ])
  //     )
  //   }
  // });
  const methods = useForm({
    defaultValues: {
      startDate: visitData?.visitParts[0]!.startDate,
      hourDate: visitData?.visitParts[0]!.startDate
    }
  });

  // const mutation = useMutation({
  //   mutationFn: (serviceIds: number[]) =>
  //     changeEmployeeServiceAssignment(employeeData.id, serviceIds),
  //   onSuccess: () => {
  //     return toast.promise(
  //       (async () => {
  //         await queryClient.invalidateQueries({
  //           queryKey: service.employeesWithFilters({ includeEmployee: true })
  //         });
  //       })(),
  //       {
  //         loading: 'Saving employee data changes',
  //         success: 'Save success',
  //         error: 'Failed to save employee data changes'
  //       }
  //     );
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   }
  // });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  return (
    <FormProvider {...methods}>
      <p>{`Old date: ${displayDateWithHours(
        visitData?.visitParts[0]!.startDate
      )}`}</p>
      <form>
        <CalendarWithHours
          calendarInputName="startDate"
          hourInputName="hourDate"
          label="Cleaning start date"
          // onChangeDate={onChangeStartDate}
          // onChangeHour={onChangeHourDate}
          dateErrorLabel={errors.startDate?.message}
          hourErrorLabel={errors.hourDate?.message}
          busyHours={[]}
          direction="row"
        />
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default ChangeVisitDateForm;
