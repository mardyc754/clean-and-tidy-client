import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { reservation, visit } from '~/constants/queryKeys';

import { changeVisitData } from '~/api/visit';

import { changeVisitDataResolver } from '~/schemas/forms/reservationManagement';

import { useAuth } from '~/hooks/auth/useAuth';
import { useEmployeesBusyHours } from '~/hooks/orderServiceForm/useEmployeesBusyHours';

import Button from '~/components/atoms/buttons/Button';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import {
  advanceDateByNMinutes,
  advanceDateByWeeks,
  displayDateWithHours,
  displayDayDateAndHourDate,
  extractYearAndMonthFromDateToString,
  mergeDayDateAndHourDate
} from '~/utils/dateUtils';
import { timeslotsIntersection } from '~/utils/serviceUtils';
import { getVisitDuration } from '~/utils/visitUtils';

import { CleaningFrequency } from '~/types/enums';
import type { NullableDate } from '~/types/forms';

import { CalendarWithHours } from '../form-fields';

const ChangeVisitDateForm = () => {
  const { visitData, reservationName } = useContext(VisitDataContext);
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const visitStartDate = visitData?.visitParts[0]!.startDate;
  const visitEndDate =
    visitData?.visitParts[visitData.visitParts.length - 1]!.endDate;
  const [period, setPeriod] = useState<string | undefined>(undefined);

  const dateDuration = useRef(visitData ? getVisitDuration(visitData) : 0);

  const uniqueVisitIds = visitData?.id ? [visitData.id] : [];

  const methods = useForm<{ startDate: NullableDate; hourDate: NullableDate }>({
    defaultValues: {
      startDate: visitData?.visitParts[0]?.startDate
        ? new Date(visitData?.visitParts[0]?.startDate)
        : null,
      hourDate: visitData?.visitParts[0]?.startDate
        ? new Date(visitData?.visitParts[0]?.startDate)
        : null
    },
    resolver: changeVisitDataResolver
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = methods;

  const onChangeStartDate = () => {
    setValue('hourDate', null);
  };

  const mutation = useMutation({
    mutationFn: (newDate: string) => changeVisitData(visitData!.id, newDate),
    onSuccess: () => {
      if (!visitData) {
        return null;
      }
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: reservation.byName(reservationName!)
          });

          await queryClient.invalidateQueries({
            queryKey: visit.detail(visitData.id)
          });

          await queryClient.invalidateQueries({
            queryKey: visit.client(currentUser!.id)
          });
        })(),
        {
          loading: 'Changing visit date',
          success: 'Save success',
          error: 'Failed to change visit date'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const startDate = watch('startDate');
  const hourDate = watch('hourDate');

  useEffect(() => {
    if (startDate && visitEndDate) {
      setPeriod(extractYearAndMonthFromDateToString(startDate));
    }
  }, [startDate, visitEndDate]);

  const { busyHoursData } = useEmployeesBusyHours({
    visitIds: uniqueVisitIds,
    excludeFrom: visitStartDate,
    excludeTo: visitEndDate,
    period,
    frequency: CleaningFrequency.ONCE
  });

  const isNewDateAvailable = () => {
    const employees = busyHoursData?.employees;
    if (!startDate || !hourDate || !visitData || !employees) return false;

    const newStartDate = mergeDayDateAndHourDate(startDate, hourDate);
    const newEndDate = advanceDateByNMinutes(
      newStartDate,
      dateDuration.current
    );

    return (
      timeslotsIntersection([
        busyHoursData?.busyHours ?? [],
        [
          {
            startDate: newStartDate.toISOString(),
            endDate: newEndDate.toISOString()
          }
        ]
      ]).length === 0
    );
  };

  return (
    <FormProvider {...methods}>
      <p>{`Old date: ${displayDateWithHours(
        visitData?.visitParts[0]!.startDate
      )}`}</p>
      <p>{`New date: ${displayDayDateAndHourDate(startDate, hourDate)}`}</p>
      <form
        onSubmit={handleSubmit((data, e) => {
          e?.preventDefault();
          mutation.mutate(
            mergeDayDateAndHourDate(data.startDate, data.hourDate).toISOString()
          );
        })}
      >
        <CalendarWithHours
          calendarInputName="startDate"
          hourInputName="hourDate"
          label="New cleaning start date"
          fromDate={
            new Date(
              visitData?.visitParts[visitData.visitParts.length - 1]!.endDate ??
                Date.now()
            )
          }
          toDate={advanceDateByWeeks(visitStartDate, 1)}
          onChangeDate={onChangeStartDate}
          dateErrorLabel={errors.startDate?.message}
          hourErrorLabel={errors.hourDate?.message}
          busyHours={busyHoursData?.busyHours ?? []}
          fromMonth={visitStartDate ? new Date(visitStartDate) : undefined}
          direction="row"
          currentDuration={dateDuration.current}
        />
        <DialogFooter>
          <Button disabled={!isNewDateAvailable()}>Save changes</Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default ChangeVisitDateForm;
