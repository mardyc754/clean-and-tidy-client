import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { employee, service } from '~/constants/queryKeys';

import type { ResponseError } from '~/api/errors/ResponseError';
import { createService } from '~/api/services';

import type { Service } from '~/schemas/api/services';
import {
  type CreateServiceData,
  type CreateServiceError,
  createServiceResolver
} from '~/schemas/forms/admin';

import { useServices } from '~/hooks/adminForms/useServices';

import { Button } from '~/components/atoms/buttons';
import {
  ErrorLabel,
  FormCheckbox,
  NumericInput
} from '~/components/atoms/forms';
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

  const methods = useForm<CreateServiceData>({
    defaultValues: {
      secondaryServices: Object.fromEntries(
        (services ?? []).map((service) => [`${service.id}`, false])
      )
    },

    resolver: createServiceResolver
  });

  const {
    formState: { errors },
    handleSubmit,
    setError,
    watch
  } = methods;

  console.log(watch());

  const mutation = useMutation<
    Service,
    ResponseError<CreateServiceError>,
    CreateServiceData
  >({
    mutationFn: createService,
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: service.employeesWithFilters({ includeEmployee: true })
          });
          await router.push({
            pathname: '/admin/profile',
            query: { ...router.query, defaultTab: '3' }
          });
        })(),
        {
          loading: 'Creating service',
          success: 'Service created',
          error: 'Failed to create service'
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

  console.log(errors);

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
                label="Service name"
                name="name"
                placeholder="Service name"
                errorLabel={errors.name?.message}
              />
              <Textfield
                label="Unit name"
                name="unit.fullName"
                placeholder="Unit full name"
                errorLabel={errors.unit?.fullName?.message}
              />
              <Textfield
                label="Unit short name"
                name="unit.shortName"
                placeholder="Unit short name"
                errorLabel={errors.unit?.shortName?.message}
              />
              <Textfield
                label="Price per unit"
                name="unit.price"
                placeholder="Price per unit"
                errorLabel={errors.unit?.price?.message}
              />

              <NumericInput
                name="unit.duration"
                min={1}
                label="Duration per unit (in minutes)"
                max={480}
                errorLabel={errors.unit?.duration?.message}
              />
              <FormCheckbox name="isPrimary" caption="Is primary service?" />
              <NumericInput
                name="minNumberOfUnitsIfPrimary"
                min={1}
                label="Minimum number of units if primary"
                max={500}
                errorLabel={errors.minNumberOfUnitsIfPrimary?.message}
              />
              <Textfield
                label="Minimum required cost if primary"
                name="minCostIfPrimary"
                placeholder="Price per unit"
                errorLabel={errors.minCostIfPrimary?.message}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heading2>Select extra services</Heading2>
            </CardHeader>
            <CardContent>
              <ServicesMultiSelect
                serviceData={services?.filter((service) => service.unit) ?? []}
                name="secondaryServices"
              />
              <CardFooter className="py-4">
                {errors.secondaryServices?.root?.message && (
                  <ErrorLabel>
                    {errors.secondaryServices.root?.message}
                  </ErrorLabel>
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
