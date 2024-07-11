import React from 'react';
import {Status, Statuses, Task} from "@/api/fakeTasksApi.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useChangeTaskStatusMutation} from "@/api/hooks/task/mutation/useChangeTaskStatusMutation.tsx";
import {capitalizeFirstLetter} from "@/lib/utils.ts";
import {StatusIcon} from "@/components/shared/StatusIcon.tsx";

type Props = {
  task: Task;
}

export const ChangeTaskStatusAction: React.FC<Props> = ({task}) => {

  const {mutate, isPending} = useChangeTaskStatusMutation(task)


  return (
    <Select
      defaultValue={task.status}
      onValueChange={(newStatus) => mutate(newStatus as Status)}
      disabled={isPending}>
      <SelectTrigger className="text-xs h-[36px]">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {Statuses.map(s => <SelectItem key={s} value={s}>
          <div className={'text-xs flex flex-row gap-2 items-center font-medium'}>
            <StatusIcon status={s} className={'w-5 h-5'}/>
            {capitalizeFirstLetter(s)}
          </div>
        </SelectItem>)}
      </SelectContent>
    </Select>
  );
};

