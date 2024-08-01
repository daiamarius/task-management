import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'

export const TaskCardSkeleton: React.FC = () => {
  return (
    <Card className={'flex flex-col justify-between'}>
      <CardHeader>
        <CardTitle className={'text-sm flex flex-col gap-1'}>
          <Skeleton className={'w-full h-8'} />

          <div className={'flex flex-row justify-between items-center gap-2'}>
            <Skeleton className={'w-[150px] h-5'} />
            <Skeleton className={'w-[100px] h-5'} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className={'flex flex-col gap-1 w-full'}>
            <Skeleton className={'w-full h-5'} />
            <Skeleton className={'w-2/3 h-5'} />
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className={'flex flex-col gap-2 w-full'}>
          <Skeleton className={'w-full h-8'} />
          <div className={'flex flex-row items-center gap-1'}>
            <Skeleton className={'w-full h-8'} />
            <Skeleton className={'w-10 h-8'} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
