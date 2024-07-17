import { FakeTasksApi, Task } from '@/api/fakeTasksApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FakeApiResponse } from '@/api/lib/fakeApi.ts'
import { toast } from '@/components/ui/use-toast.ts'
import { QueryKeys } from '@/api/hooks/QueryKeys.tsx'
import { useContext } from 'react'
import { AuthenticationContext } from '@/auth/AuthenticationContext.tsx'

function findNextIndex(): number {
    const objects: Task[] = FakeTasksApi.getData()

    let highest = objects[0].index

    for (let i = 1; i < objects.length; i++) {
        if (objects[i].index > highest) {
            highest = objects[i].index
        }
    }

    return highest
}

type MutationCallback = {
    onSuccess?: () => void
}

const useAddTaskMutation = (callback?: MutationCallback) => {
    const queryClient = useQueryClient()

    const { user } = useContext(AuthenticationContext)

    return useMutation<
        FakeApiResponse,
        FakeApiResponse,
        Omit<
            Task,
            'id' | 'index' | 'creator' | 'createdAt' | 'status' | 'updatedAt'
        >
    >({
        mutationFn: (newTask) => {
            return FakeTasksApi.add({
                ...newTask,
                creator: user?.id ?? '',
                status: 'TODO',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                index: findNextIndex() + 1,
            })
        },
        onSuccess: () => {
            toast({
                title: 'Task created successfully.',
                description: 'The new task has been added successfully.',
                duration: 1500,
            })
            queryClient.invalidateQueries({ queryKey: QueryKeys.task.getAll() })
            queryClient.invalidateQueries({
                queryKey: QueryKeys.task.getByStatus('TODO'),
            })
            callback?.onSuccess && callback?.onSuccess()
        },
    })
}

export { useAddTaskMutation }
