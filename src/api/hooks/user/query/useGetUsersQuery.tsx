import {FakeApiResponse} from "@/api/lib/fakeApi.ts";
import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";
import {FakeUserApi, User} from "@/api/fakeTasksApi.ts";

type UserQueryOptions = {
  select?: (data: User[]) => User[];
}
export const useGetUsersQuery = ({select}: UserQueryOptions) => {
  return useQuery<User[], FakeApiResponse>({
    queryKey: QueryKeys.user.getAll(),
    queryFn: () => {
      return FakeUserApi.getAll()
    },
    select,
    staleTime: 1000
  })
}
