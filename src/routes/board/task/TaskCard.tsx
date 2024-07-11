import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {NavLink} from "react-router-dom";
import {LuCalendar} from "react-icons/lu";
import {CreatorLabel} from "@/routes/board/task/components/CreatorLabel.tsx";
import {TaskCardActions} from "@/routes/board/task/components/TaskCardActions.tsx";
import {parseDate} from "@/lib/utils.ts";
import {Progress} from "@/components/ui/progress.tsx";
import {Id} from "@/api/lib/fakeApi.ts";
import {useGetTaskQuery} from "@/api/hooks/task/query/useGetTaskQuery.tsx";
import {TaskCardSkeleton} from "@/routes/task/TaskCardSkeleton.tsx";

type Props = {
  taskId: Id;
}
export const TaskCard: React.FC<Props> = ({taskId}) => {
  const {data: task, isLoading, isFetching} = useGetTaskQuery(taskId)

  if (isLoading || !task) {
    return <TaskCardSkeleton/>
  }

  return (
    <Card className={'flex flex-col justify-between relative'}>
      <CardHeader>
        <CardTitle className={'text-sm flex flex-col gap-1'}>
          <NavLink to={`/task/${task.id}`} className={'text-primary hover:underline transition line-clamp-2 h-[42px]'}>
            TASK-{task.index}: {task.title}
          </NavLink>
          <div className={'inline-flex justify-between items-center'}>
            <CreatorLabel userId={task.creator}/>
            <div className={'flex flex-col'}>
              {task.createdAt !== task.updatedAt && (
                <div className={'text-xs font-light text-muted-foreground shrink-0 flex gap-1 items-center'}>
                  Updated:
                  <LuCalendar/>
                  {parseDate(task.updatedAt)}
                </div>
              )}
              {task.createdAt === task.updatedAt && (
                <div className={'text-xs font-light text-muted-foreground shrink-0 flex gap-1 items-center'}>
                  Created:
                  <LuCalendar/>
                  {parseDate(task.createdAt)}
                </div>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={'line-clamp-2 text-xs h-[34px]'}>
          {task.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <TaskCardActions task={task}/>
      </CardFooter>
      {isFetching && <Progress indeterminate={true} className={'h-1 absolute rounded-t-none bottom-0'}/>}
    </Card>
  );
};
