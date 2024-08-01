import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { twMerge } from 'tailwind-merge'
import { User } from '@/api/fakeTasksApi.ts'

type Props = {
  user: User
  className?: string
}

export const UserAvatar: React.FC<Props> = ({ user, className }) => {
  return (
    <Avatar className={twMerge('w-5 h-5', className)}>
      <AvatarImage src={user.avatarUrl} alt="avatar" />
      <AvatarFallback>
        {user.fullName?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
