import React from 'react'
import { Task } from '@/api/fakeTasksApi.ts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useGetUsersQuery } from '@/api/hooks/user/query/useGetUsersQuery.tsx'
import { useChangeTaskAsigneeMutation } from '@/api/hooks/task/mutation/useChangeTaskAsigneeMutation.tsx'
import { Id } from '@/api/lib/fakeApi.ts'
import { TbUserQuestion } from 'react-icons/tb'
import { UserLabel } from '@/components/shared/UserLabel.tsx'

type Props = {
  task: Task
}

export const ChangeTaskAsigneeAction: React.FC<Props> = ({ task }) => {
  const { data: users } = useGetUsersQuery({})

  const { mutate, isPending } = useChangeTaskAsigneeMutation(task)

  const onChange = (id: string) => {
    mutate(id as Id)
  }

  return (
    <Select
      defaultValue={task?.asignee}
      onValueChange={onChange}
      disabled={isPending}
    >
      <SelectTrigger className="pl-3 text-xs  h-[36px]">
        <SelectValue
          placeholder={
            <div className={'flex flex-row items-center w-full gap-2'}>
              <TbUserQuestion className={'w-5 h-5'} />
              <div className={'font-medium text-xs line-clamp-1'}>
                Unassigned
              </div>
            </div>
          }
        ></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => (
          <SelectItem value={user.id}>
            <UserLabel user={user} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
