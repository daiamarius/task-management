import React from 'react';
import {Status} from "@/api/fakeTasksApi.ts";
import {TaskCard} from "@/routes/board/task/TaskCard.tsx";
import {StatusIcon} from "@/components/shared/StatusIcon.tsx";
import {capitalizeFirstLetter, range} from "@/lib/utils.ts";
import {TaskCardSkeleton} from "@/routes/task/TaskCardSkeleton.tsx";
import {useGetTasksByStatusQuery} from "@/api/hooks/task/query/useGetTasksByStatusQuery.tsx";

type Props = {
  status: Status;
}

export const StatusTrack: React.FC<Props> = ({status}) => {

  const {data: tasks, isLoading} = useGetTasksByStatusQuery({status})

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-row items-center gap-2'}>
        <StatusIcon className={'size-8'} status={status}/>
        <h1 className={'text-2xl font-medium tracking-wider'}>
          {capitalizeFirstLetter(status)}
        </h1>
      </div>

      {!isLoading && tasks?.map(x => (
        <TaskCard key={x.id} taskId={x.id}/>
      ))}

      {isLoading && range(3).map(x => <TaskCardSkeleton key={x}/>)}
    </div>
  );
};
