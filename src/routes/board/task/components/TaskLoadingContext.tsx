import React, {createContext, PropsWithChildren, useState} from "react";
import {Id} from "@/api/lib/fakeApi.ts";


type TaskLoadingContextType = {
  loadingTasksId: Id[];
  setLoading: (id: Id) => void;
  clearLoading: () => void;
}

export const TaskLoadingContext = createContext<TaskLoadingContextType>({} as TaskLoadingContextType)

export const TaskLoadingContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [loadingTasksId, setLoadingTasksId] = useState<Id[]>([]);

  return (
    <TaskLoadingContext.Provider
      value={{
        loadingTasksId,
        setLoading: (id: Id) => setLoadingTasksId(prevState => [...prevState, id]),
        clearLoading: () => setLoadingTasksId([])
      }}
    >
      {children}
    </TaskLoadingContext.Provider>
  )
}
