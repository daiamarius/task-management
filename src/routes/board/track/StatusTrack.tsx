import React, {useContext, useEffect} from 'react';
import {Status} from "@/api/fakeTasksApi.ts";
import {TaskCard} from "@/routes/board/task/TaskCard.tsx";
import {useGetTasksQuery} from "@/api/hooks/task/query/useGetTasksQuery.tsx";
import {StatusIcon} from "@/components/shared/StatusIcon.tsx";
import {capitalizeFirstLetter, range} from "@/lib/utils.ts";
import {TaskCardSkeleton} from "@/routes/task/TaskCardSkeleton.tsx";
import {TaskLoadingContext} from "@/routes/board/task/components/TaskLoadingContext.tsx";

type Props = {
  status: Status;
}

export const StatusTrack: React.FC<Props> = ({status}) => {

  const { clearLoading } = useContext(TaskLoadingContext);
  const {data: tasks, isLoading, isFetching} = useGetTasksQuery({
    select: data => data
        .filter(x => x.status === status)
        .sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  })

  useEffect(() => {
    console.log(isFetching)
    if(isFetching){
      clearLoading();
    }
  }, [isFetching])



  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-row items-center gap-2'}>
        <StatusIcon className={'size-8'} status={status}/>
        <h1 className={'text-2xl font-medium tracking-wider'}>
          {capitalizeFirstLetter(status)}
        </h1>
      </div>

      {!isLoading && tasks?.map(x => (
        <TaskCard key={x.id} task={x}/>
      ))}

      {isLoading && range(3).map(x => <TaskCardSkeleton key={x}/>)}
    </div>
  );
};
