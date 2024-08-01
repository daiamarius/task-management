import React from 'react'
import { Task } from '@/api/fakeTasksApi.ts'
import { ChangeTaskStatusAction } from '@/routes/board/task/actions/ChangeTaskStatusAction.tsx'
import { ChangeTaskAsigneeAction } from '@/routes/board/task/actions/ChangeTaskAsigneeAction.tsx'
import { EditTaskAction } from '@/routes/board/task/actions/EditTaskAction.tsx'

type Props = {
  task: Task
}

export const TaskCardActions: React.FC<Props> = ({ task }) => {
  return (
    <div className={'flex flex-col gap-1 w-full'}>
      <div className={'text-xs text-muted-foreground font-medium'}>Asignee</div>
      <ChangeTaskAsigneeAction task={task} />

      <div className={'flex flex-row gap-1'}>
        <ChangeTaskStatusAction task={task} />
        <EditTaskAction task={task} />
      </div>
    </div>
  )
}
