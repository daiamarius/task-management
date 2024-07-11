import React from 'react';
import {useParams} from "react-router-dom";
import {useGetTaskQuery} from "@/api/hooks/task/query/useGetTaskQuery.tsx";
import {TaskCard} from "@/routes/board/task/TaskCard.tsx";
import {TaskCardSkeleton} from "@/routes/task/TaskCardSkeleton.tsx";

export const TaskDetails: React.FC = () => {

  const {taskId} = useParams();

  const {data: task} = useGetTaskQuery(taskId)

  if (!task) {
    return <TaskCardSkeleton/>
  }

  return (
    <TaskCard task={task}/>
  );
};
