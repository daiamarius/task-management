import React from 'react'
import { PositionBadge } from '@/components/shared/PositionBadge.tsx'
import { UserAvatar } from '@/components/shared/UserAvatar.tsx'
import { User } from '@/api/fakeTasksApi.ts'

type Props = {
    user: User
    showPosition?: boolean
}

export const UserLabel: React.FC<Props> = ({ user, showPosition = false }) => {
    return (
        <div className={'flex flex-row items-center w-full gap-2'}>
            <UserAvatar user={user} />
            <div className={'font-medium text-xs line-clamp-1'}>
                {user.fullName}
            </div>
            {showPosition && <PositionBadge position={user.position} />}
        </div>
    )
}
