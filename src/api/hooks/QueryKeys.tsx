import { Id } from '@/api/lib/fakeApi.ts'
import { Status } from '@/api/fakeTasksApi.ts'

export const QueryKeys = {
  user: {
    getAll: () => ['users'],
    getById: (id?: Id) => ['user', id],
  },
  task: {
    getAll: () => ['tasks'],
    getByStatus: (status: Status) => ['tasks-by-status', status],
    getById: (id?: Id) => ['task', id],
  },
}
