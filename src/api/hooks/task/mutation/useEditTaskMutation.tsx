import { FakeTasksApi, Task } from '@/api/fakeTasksApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FakeApiResponse } from '@/api/lib/fakeApi.ts'
import { toast } from '@/components/ui/use-toast.ts'
import { QueryKeys } from '@/api/hooks/QueryKeys.tsx'
import { useContext } from 'react'
import { TaskLoadingContext } from '@/routes/board/task/components/TaskLoadingContext.tsx'

type MutationCallback = {
    onSuccess?: () => void
}

export const useEditTaskMutation = (
    task: Task,
    callback?: MutationCallback
) => {
    const queryClient = useQueryClient()

    const { setLoading } = useContext(TaskLoadingContext)

    return useMutation<
        FakeApiResponse,
        FakeApiResponse,
        Omit<Task, 'id' | 'creator' | 'createdAt' | 'index' | 'updatedAt'>
    >({
        mutationFn: (edited) => {
            setLoading(task.id)

            return FakeTasksApi.update(task.id, {
                ...task,
                ...edited,
                updatedAt: new Date().toISOString(),
            })
        },
        onSuccess: (_, edited) => {
            toast({
                title: 'Task edited successfully.',
                description: 'The task has been edited successfully.',
                duration: 1500,
            })
            queryClient.invalidateQueries({
                queryKey: QueryKeys.task.getByStatus(task.status),
            })
            queryClient.invalidateQueries({
                queryKey: QueryKeys.task.getByStatus(edited.status),
            })
            queryClient.invalidateQueries({
                queryKey: QueryKeys.task.getById(task.id),
            })
            callback?.onSuccess && callback.onSuccess()
        },
    })
}
