import React from 'react'
import { Id } from '@/api/lib/fakeApi.ts'
import { useGetUserQuery } from '@/api/hooks/user/query/useGetUserQuery.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { UserLabel } from '@/components/shared/UserLabel.tsx'

type Props = {
  userId: Id
}

export const CreatorLabel: React.FC<Props> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserQuery(userId)

  if (isLoading || !user) {
    return (
      <div className={'flex flex-row items-center gap-2'}>
        <Skeleton className={'w-4 h-4 rounded-full'} />
        <Skeleton className={'w-[100px] h-5'} />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={'cursor-help'}>
            <UserLabel user={user} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <UserLabel user={user} showPosition={true} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
