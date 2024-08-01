import { useParams } from 'react-router-dom'
import { TaskCard } from '@/routes/board/task/TaskCard.tsx'
import { TaskCardSkeleton } from '@/routes/task/TaskCardSkeleton.tsx'

export const TaskDetails = () => {
  const { taskId } = useParams()

  if (!taskId) {
    return <TaskCardSkeleton />
  }
  return <TaskCard taskId={taskId} />
}
