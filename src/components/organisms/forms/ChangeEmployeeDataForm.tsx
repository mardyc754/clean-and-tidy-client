import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { employee } from '~/constants/queryKeys';

import { changeEmployeeData } from '~/api/employee';
import type { ResponseError } from '~/api/errors/ResponseError';

import type { Employee, EmployeeWithServices } from '~/schemas/api/employee';
import type { Service } from '~/schemas/api/services';
import type { BackendBasicErrorData } from '~/schemas/common';
import {
  type EmployeeChangeData,
  changeEmployeeDataResolver
} from '~/schemas/forms/admin';

import { Button } from '~/components/atoms/buttons';
import { ErrorLabel, FormCheckbox } from '~/components/atoms/forms';
import { Heading2 } from '~/components/atoms/typography/headings';
import { Textfield } from '~/components/molecules/form-fields';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/shadcn/ui/card';

import { ServicesMultiSelect } from '../form-fields';

type ChangeEmployeeDataFormProps = {
  employeeData: EmployeeWithServices;
  services: Service[];
};

const ChangeEmployeeDataForm = ({
  employeeData,
  services
}: ChangeEmployeeDataFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const methods = useForm<EmployeeChangeData>({
    defaultValues: {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      phone: employeeData.phone,
      isAdmin: employeeData.isAdmin,
      services: Object.fromEntries(
        (services ?? []).map((service) => [
          `${service.id}`,
          employeeData.services?.some((s) => s.id === service.id) ?? false
        ])
      )
    },

    resolver: changeEmployeeDataResolver
  });

  const {
    formState: { errors },
    handleSubmit
  } = methods;

  const mutation = useMutation<
    Employee,
    ResponseError<BackendBasicErrorData>,
    EmployeeChangeData
  >({
    mutationFn: (data: EmployeeChangeData) =>
      changeEmployeeData(employeeData.id, data),
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: employee.all
          });
          await router.push({
            pathname: '/admin/profile',
            query: { ...router.query, defaultTab: '2' }
          });
        })(),
        {
          loading: 'Changing employee data',
          success: 'Employee data changed',
          error: 'Failed to change employee data'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data, e) => {
          e?.preventDefault();
          mutation.mutate(data);
        })}
      >
        <div className="grid grid-cols-1 pt-12 md:grid-cols-2 md:space-x-4 md:space-y-0">
          <Card className="items-start space-y-1 px-4">
            <CardHeader>
              <Heading2>General data</Heading2>
            </CardHeader>
            <CardContent className="grid-rows-7 grid max-w-sm ">
              <Textfield
                label="First Name"
                name="firstName"
                placeholder="First Name"
                errorLabel={errors.firstName?.message}
              />
              <Textfield
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                errorLabel={errors.lastName?.message}
              />
              <Textfield label="Phone" name="phone" placeholder="Phone" />
              <FormCheckbox caption="Is admin" name="isAdmin" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heading2>Assigned services</Heading2>
            </CardHeader>
            <CardContent>
              <ServicesMultiSelect
                serviceData={services ?? []}
                name="services"
              />
              <CardFooter className="py-4">
                {errors.services?.root?.message && (
                  <ErrorLabel>{errors.services.root?.message}</ErrorLabel>
                )}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end py-4">
          <Button className="w-28" type="submit">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangeEmployeeDataForm;
