import {FakeTasksApi, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse, Id} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";
import {useContext} from "react";
import {TaskLoadingContext} from "@/routes/board/task/components/TaskLoadingContext.tsx";


export const useChangeTaskAsigneeMutation = (task: Task) => {
  const queryClient = useQueryClient()

  const {setLoading} = useContext(TaskLoadingContext)

  return useMutation<FakeApiResponse, FakeApiResponse, Id>({
    mutationFn: (id) => {
      setLoading(task.id);
      return FakeTasksApi.update(task.id, {
        ...task,
        asignee: id,
        updatedAt: new Date().toISOString()
      })
    },
    onSuccess: () => {
      toast({
        title: 'Task reassigned successfully.',
        description: 'The task has been reassigned successfully.',
        duration: 1500
      })
      queryClient.invalidateQueries({queryKey: QueryKeys.task.getById(task.id)})
    }
  })
}
