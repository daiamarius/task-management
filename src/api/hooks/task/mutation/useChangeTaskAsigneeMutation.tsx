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

  const mutation = useMutation<FakeApiResponse, FakeApiResponse, Id>({
    mutationFn: (id) => {
      setLoading(task.id);
      return FakeTasksApi.update(task.id, {
        ...task,
        asignee: id,
        updatedAt: new Date().toISOString()
      })
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
