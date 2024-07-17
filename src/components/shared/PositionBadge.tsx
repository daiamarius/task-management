import React from 'react'
import { Badge } from '@/components/ui/badge.tsx'
import { capitalizeFirstLetter } from '@/lib/utils.ts'
import { Position } from '@/api/fakeTasksApi.ts'

type Props = {
    position: Position
}

export const PositionBadge: React.FC<Props> = ({ position }) => {
    return (
        <Badge variant={'secondary'}>{capitalizeFirstLetter(position)}</Badge>
    )
}
