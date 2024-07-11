import {FakeApiResponse, Id} from "@/api/lib/fakeApi.ts";
import {useQuery} from "@tanstack/react-query";
import {FakeUserApi, User} from "@/api/fakeUsersApi.ts";
import {QueryKeys} from "@/api/hooks/QueryKeys.tsx";

export const useGetUserQuery = (id?: Id) => {
  return useQuery<User, FakeApiResponse>({
    queryKey: QueryKeys.user.getById(id),
    queryFn: () => {
      return FakeUserApi.getById(id as Id)
    },
    enabled: !!id,
    staleTime: 1000
  })
}
