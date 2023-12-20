import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { employee } from '~/constants/queryKeys';

import { createEmployee } from '~/api/employee';
import type { ResponseError } from '~/api/errors/ResponseError';

import type { Employee } from '~/schemas/api/employee';
import {
  type CreateEmployeeData,
  type CreateEmployeeError,
  createEmployeeResolver
} from '~/schemas/forms/admin';

import { useServices } from '~/hooks/adminForms/useServices';

import { Button } from '~/components/atoms/buttons';
import { ErrorLabel } from '~/components/atoms/forms';
import { Heading2 } from '~/components/atoms/typography/headings';
import { Textfield } from '~/components/molecules/form-fields';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/shadcn/ui/card';

import { ServicesMultiSelect } from '../form-fields';

const CreateEmployeeForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { services } = useServices();

  const methods = useForm<CreateEmployeeData>({
    defaultValues: {
      services: Object.fromEntries(
        (services ?? []).map((service) => [`${service.id}`, false])
      )
    },

    resolver: createEmployeeResolver
  });

  const {
    formState: { errors },
    handleSubmit,
    setError
  } = methods;

  const mutation = useMutation<
    Employee,
    ResponseError<CreateEmployeeError>,
    CreateEmployeeData
  >({
    mutationFn: createEmployee,
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: employee.filters({ includeVisits: true })
          });
          await router.push({
            pathname: '/admin/profile',
            query: { ...router.query, defaultTab: '2' }
          });
        })(),
        {
          loading: 'Creating employee',
          success: 'Employee created',
          error: 'Failed to create employee'
        }
      );
    },
    onError: (error) => {
      // need to throw an error or at least reject the promise
      if (error.data.affectedField) {
        setError(error.data.affectedField, { message: error.message });
        return;
      }
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
          <Card className="grid-rows-7 grid items-start space-y-1 px-4">
            <CardHeader>
              <Heading2>General data</Heading2>
            </CardHeader>
            <CardContent className="max-w-sm">
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
              <Textfield
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                errorLabel={errors.email?.message}
              />
              <Textfield label="Phone" name="phone" placeholder="Phone" />
              <Textfield
                type="password"
                label="Password"
                name="password"
                placeholder="Password"
                errorLabel={errors.password?.message}
              />
              <Textfield
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                errorLabel={errors.confirmPassword?.message}
              />
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
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateEmployeeForm;
