import {Id} from "@/api/lib/fakeApi.ts";

export const QueryKeys = {
  user: {
    getAll: () => ['user'],
    getById: (id?: Id) => ['user', id]
  },
  task: {
    getAll: () => ['task'],
    getById: (id?: Id) => ['task', id]
  }
}
