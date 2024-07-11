import {FakeTasksApi, Status, Task} from "@/api/fakeTasksApi.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";
import {useContext} from "react";
import {TaskLoadingContext} from "@/routes/board/task/components/TaskLoadingContext.tsx";


export const useChangeTaskStatusMutation = (task: Task) => {
  const queryClient = useQueryClient()

  const {setLoading} = useContext(TaskLoadingContext)

  const mutation =  useMutation<FakeApiResponse, FakeApiResponse, Status>({
    mutationFn: (newStatus) => {
      setLoading(task.id);
      return FakeTasksApi.update(task.id, {
        ...task,
        status: newStatus,
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
