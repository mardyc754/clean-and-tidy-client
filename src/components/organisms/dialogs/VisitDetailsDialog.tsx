import { DialogPortal, DialogTrigger } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { visit } from '~/constants/queryKeys';

import { getVisitById } from '~/api/visit';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import { Spinner } from '~/components/molecules/status-indicators';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle
} from '~/components/shadcn/ui/dialog';

import { getVisitEmployees } from '~/utils/visitUtils';

import { VisitActions } from '../button-fields';
import {
  EmployeeSecondaryList,
  ExtendedVisitDetailsList,
  VisitDetailsList
} from '../lists';

type VisitDetailsDialogProps = {
  visitId: VisitWithEmployees['id'];
  children: React.ReactNode;
  title: string;
  reservationName: string;
};

const VisitDetailsDialog = ({
  visitId,
  title,
  reservationName,
  children
}: VisitDetailsDialogProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: visit.detail(visitId, { includeEmployee: true }),
    queryFn: () => getVisitById(visitId),
    enabled: false
  });

  const employees = useMemo(
    () => (data ? getVisitEmployees(data) : []),
    [data]
  );

  return (
    <VisitDataContext.Provider
      value={{ visitData: data ?? null, reservationName }}
    >
      <Dialog>
        <DialogTrigger
          onClick={async () => await refetch()}
          className="h-full w-full flex-col"
        >
          {children}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="min-w-[50vw]">
            <DialogTitle>{title}</DialogTitle>
            {!data || isLoading ? (
              <Spinner caption="Loading visit data..." />
            ) : (
              <>
                <div className="pb-4">
                  <ExtendedVisitDetailsList data={data} />
                  <VisitDetailsList data={data} />
                </div>
                {employees.length > 0 && <EmployeeSecondaryList data={data} />}
              </>
            )}
            <DialogFooter className="flex items-center justify-between space-x-4">
              <VisitActions />
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </VisitDataContext.Provider>
  );
};

export default VisitDetailsDialog;
