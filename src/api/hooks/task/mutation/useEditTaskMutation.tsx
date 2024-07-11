import {FakeTasksApi, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";


type MutationCallback = {
  onSuccess?: () => void
}


export const useEditTaskMutation = (task: Task, callback?: MutationCallback) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<FakeApiResponse, FakeApiResponse, Omit<Task, 'id' | 'creator' | 'createdAt' | 'index'>>({
    mutationFn: (edited) => {
      return FakeTasksApi.update(task.id, {...task, ...edited})
    },
    onSuccess: (r) => {
      toast({
        title: 'Success',
        description: r.message
      })
      queryClient.invalidateQueries({queryKey: QueryKeys.task.getAll()})
      queryClient.invalidateQueries({queryKey: QueryKeys.task.getById(task.id)})
      callback?.onSuccess && callback.onSuccess();
    }
  })

  return mutation
}
