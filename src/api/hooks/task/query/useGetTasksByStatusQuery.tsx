import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {useQuery} from "@tanstack/react-query";
import {FakeTasksApi, Status, Task} from "@/api/fakeTasksApi.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";

export const useGetTasksByStatusQuery = ({status}: {
  status: Status;
}) => {
  return useQuery<Task[], FakeApiResponse>({
    queryKey: QueryKeys.task.getByStatus(status),
    queryFn: () => {
      return FakeTasksApi.getAll()
    },
    select: (data) => data
      .filter(x => x.status === status)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    staleTime: 1000,
  })
}
