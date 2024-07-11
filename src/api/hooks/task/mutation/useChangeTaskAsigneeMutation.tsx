import {FakeTasksApi, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse, Id} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";


export const useChangeTaskAsigneeMutation = (task: Task) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<FakeApiResponse, FakeApiResponse, Id>({
    mutationFn: (id) => {
      return FakeTasksApi.update(task.id, {...task, asignee: id})
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
