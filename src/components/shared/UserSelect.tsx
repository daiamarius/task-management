import React, {ComponentProps} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {FormControl} from "@/components/ui/form.tsx";
import {useGetUsersQuery} from "@/api/hooks/user/query/useGetUsersQuery.tsx";
import {UserLabel} from "@/components/shared/UserLabel.tsx";


export const UserSelect: React.FC<ComponentProps<typeof Select>> = (props) => {
  const {data: users} = useGetUsersQuery({})

  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger>
          <SelectValue className={'placeholder:text-muted-foreground'} placeholder="Select a registered user"/>
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {users?.map(user => (
          <SelectItem key={user.id} value={user.id}>
            <UserLabel user={user} showPosition={true}/>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
