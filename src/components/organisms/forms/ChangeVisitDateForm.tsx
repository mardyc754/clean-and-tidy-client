import { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { useEmployeesBusyHours } from '~/hooks/orderServiceForm/useEmployeesBusyHours';

import Button from '~/components/atoms/buttons/Button';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import {
  advanceDateByWeeks,
  displayDateWithHours,
  displayDayDateAndHourDate,
  extractYearAndMonthFromDateToString
} from '~/utils/dateUtils';

import { CleaningFrequency } from '~/types/enums';
import type { NullableDate } from '~/types/forms';

import { CalendarWithHours } from '../form-fields';

const ChangeVisitDateForm = () => {
  const { visitData } = useContext(VisitDataContext);
  const visitStartDate = visitData?.visitParts[0]!.startDate;
  const visitEndDate =
    visitData?.visitParts[visitData.visitParts.length - 1]!.endDate;
  const [period, setPeriod] = useState<string | undefined>(undefined);

  const uniqueVisitIds = visitData?.id ? [visitData.id] : [];

  const methods = useForm<{
    startDate: NullableDate | string;
    hourDate: NullableDate | string;
  }>({
    defaultValues: {
      startDate: visitData?.visitParts[0]!.startDate,
      hourDate: visitData?.visitParts[0]!.startDate
    }
  });

  const {
    handleSubmit,
    watch,
    formState: { errors }
  } = methods;

  const startDate = watch('startDate');

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

  return (
    <FormProvider {...methods}>
      <p>{`Old date: ${displayDateWithHours(
        visitData?.visitParts[0]!.startDate
      )}`}</p>
      <p>{`New date: ${displayDayDateAndHourDate(
        watch('startDate'),
        watch('hourDate')
      )}`}</p>
      <form>
        <CalendarWithHours
          calendarInputName="startDate"
          hourInputName="hourDate"
          label="Cleaning start date"
          fromDate={
            new Date(
              visitData?.visitParts[visitData.visitParts.length - 1]!.endDate ??
                Date.now()
            )
          }
          toDate={advanceDateByWeeks(visitStartDate, 1)}
          // onChangeDate={onChangeStartDate}
          // onChangeHour={onChangeHourDate}
          dateErrorLabel={errors.startDate?.message}
          hourErrorLabel={errors.hourDate?.message}
          busyHours={busyHoursData?.busyHours ?? []}
          fromMonth={visitStartDate ? new Date(visitStartDate) : undefined}
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
