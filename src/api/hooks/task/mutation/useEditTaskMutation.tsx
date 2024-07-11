import {FakeTasksApi, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";
import {useContext} from "react";
import {TaskLoadingContext} from "@/routes/board/task/components/TaskLoadingContext.tsx";


type MutationCallback = {
  onSuccess?: () => void
}


export const useEditTaskMutation = (task: Task, callback?: MutationCallback) => {
  const queryClient = useQueryClient()

  const {setLoading} = useContext(TaskLoadingContext)

  const mutation = useMutation<FakeApiResponse, FakeApiResponse, Omit<Task, 'id' | 'creator' | 'createdAt' | 'index' | 'updatedAt'>>({
    mutationFn: (edited) => {
      setLoading(task.id);

      return FakeTasksApi.update(task.id, {
        ...task,
        ...edited,
        updatedAt: new Date().toISOString(),
      })
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
