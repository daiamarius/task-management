import { FakeTasksApi, Status, Task } from '@/api/fakeTasksApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FakeApiResponse } from '@/api/lib/fakeApi.ts'
import { toast } from '@/components/ui/use-toast.ts'
import { QueryKeys } from '@/api/hooks/QueryKeys.tsx'

export const useChangeTaskStatusMutation = (task: Task) => {
  const queryClient = useQueryClient()

  return useMutation<FakeApiResponse, FakeApiResponse, Status>({
    mutationFn: (newStatus) => {
      return FakeTasksApi.update(task.id, {
        ...task,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })
    },
    onSuccess: (_, newStatus) => {
      toast({
        title: 'Task moved successfully.',
        description: 'The task status has been changed successfully.',
        duration: 1500,
      })
      queryClient.invalidateQueries({
        queryKey: QueryKeys.task.getByStatus(task.status),
      })
      queryClient.invalidateQueries({
        queryKey: QueryKeys.task.getByStatus(newStatus),
      })
      queryClient.invalidateQueries({
        queryKey: QueryKeys.task.getById(task.id),
      })
    },
  })
}
