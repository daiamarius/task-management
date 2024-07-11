import {FakeTasksApi, Status, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";


export const useChangeTaskStatusMutation = (task: Task) => {
  const queryClient = useQueryClient()

  const mutation =  useMutation<FakeApiResponse, FakeApiResponse, Status>({
    mutationFn: (newStatus) => {
      return FakeTasksApi.update(task.id, {...task, status: newStatus})
    },
    onSuccess: (r) => {
      toast({
        title: 'Success',
        description: r.message
      })
      queryClient.invalidateQueries({queryKey: QueryKeys.task.getAll()})
    }
  })

  return mutation
}
