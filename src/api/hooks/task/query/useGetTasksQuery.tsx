import { FakeApiResponse } from '@/api/lib/fakeApi.ts'
import { useQuery } from '@tanstack/react-query'
import { FakeTasksApi, Task } from '@/api/fakeTasksApi.ts'
import { QueryKeys } from '@/api/hooks/QueryKeys.tsx'

type TaskQueryOptions = {
    select?: (data: Task[]) => Task[]
}

export const useGetTasksQuery = ({ select }: TaskQueryOptions) => {
    return useQuery<Task[], FakeApiResponse>({
        queryKey: QueryKeys.task.getAll(),
        queryFn: () => {
            return FakeTasksApi.getAll()
        },
        select,
        staleTime: 1000,
    })
}
