import { FakeApiResponse, Id } from '@/api/lib/fakeApi.ts'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/api/hooks/QueryKeys.tsx'
import { FakeTasksApi, Task } from '@/api/fakeTasksApi.ts'

export const useGetTaskQuery = (id?: Id) => {
    return useQuery<Task, FakeApiResponse>({
        queryKey: QueryKeys.task.getById(id),
        queryFn: () => {
            return FakeTasksApi.getById(id ?? '')
        },
        enabled: !!id,
        staleTime: 1000,
    })
}
