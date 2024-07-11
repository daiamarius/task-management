import React from 'react';
import {Position} from "@/api/fakeUsersApi.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {capitalizeFirstLetter} from "@/lib/utils.ts";

type Props = {
   position: Position;
}

export const PositionBadge: React.FC<Props> = ({position}) => {
    return (
        <Badge variant={'secondary'}>
          {capitalizeFirstLetter(position)}
        </Badge>
    );
};
