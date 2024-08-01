import React, { useEffect, useRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Status } from '@/api/fakeTasksApi.ts'
import { useGetTasksQuery } from '@/api/hooks/task/query/useGetTasksQuery.tsx'
import { StatusIcon } from '@/components/shared/StatusIcon.tsx'
import { capitalizeFirstLetter } from '@/lib/utils.ts'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton.tsx'

type Props = {
  status: Status
}

export const TaskSummaryCard: React.FC<Props> = ({ status }) => {
  const { data: tasks, isLoading } = useGetTasksQuery({
    select: (tasks) => tasks.filter((x) => x.status === status),
  })

  useEffect(() => {
    console.log(tasks?.length)
  }, [tasks])

  if (isLoading || !tasks) {
    return (
      <Card>
        <CardHeader>
          <div className={'flex flex-row gap-2 items-center'}>
            <Skeleton className={'w-8 h-8'} />
            <Skeleton className={'h-8 w-[150px]'} />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className={'h-[65px] w-[150px]'} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'flex flex-row gap-2 items-center'}>
          <StatusIcon status={status} />
          {capitalizeFirstLetter(status)}
        </CardTitle>
        <CardDescription>
          <span className={'text-muted-foreground text-sm'}>
            Total tasks {status.toLowerCase()}.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Counter value={tasks?.length || 0} />
      </CardContent>
    </Card>
  )
}

export default function Counter({
  value,
  direction = 'up',
}: {
  value: number
  direction?: 'up' | 'down'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value)
    }
  }, [motionValue, isInView])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return (
    <div className={'text-7xl font-bold tracking-wide shrink-0'} ref={ref} />
  )
}
