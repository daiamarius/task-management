import React from 'react';
import {Task} from "@/api/fakeTasksApi.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {NavLink} from "react-router-dom";
import {LuCalendar} from "react-icons/lu";
import {CreatorLabel} from "@/routes/board/task/components/CreatorLabel.tsx";
import {TaskCardActions} from "@/routes/board/task/components/TaskCardActions.tsx";

type Props = {
  task: Task;
}
export const TaskCard: React.FC<Props> = ({task}) => {
  return (
    <Card className={'flex flex-col justify-between'}>
      <CardHeader>
        <CardTitle className={'text-sm flex flex-col gap-1'}>
          <NavLink to={`/task/${task.id}`} className={'text-primary hover:underline transition line-clamp-2 h-[42px]'}>
            TASK-{task.index}: {task.title}
          </NavLink>
          <div className={'inline-flex justify-between'}>
            <CreatorLabel userId={task.creator}/>
            <div className={'text-xs font-light text-muted-foreground shrink-0 flex gap-1 items-center'}>
              <LuCalendar/>
              {task.createdAt}
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
    </Card>
  );
};
