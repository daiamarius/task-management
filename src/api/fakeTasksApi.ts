import { faker } from '@faker-js/faker';
import { FakeUserApi } from './fakeUsersApi';
import {FakeApi, Id} from "@/api/lib/fakeApi.ts";

export type Status = 'TODO' | 'IN PROGRESS' | 'TESTING' | 'DONE';
export const Statuses: readonly Status[] = ['TODO', 'IN PROGRESS', 'TESTING', 'DONE'] as const;


export const TaskNameStart = ['Feature - ', 'View - ', 'Refactoring - ', 'Improvement - '] as const;


export type Task = {
  id: Id;
  index: number;
  title: string;
  description: string;
  creator: Id;
  asignee?: Id;
  status: Status;
  createdAt: string;
  updatedAt: string;
};

const generate = (index?:number): Task => {
  const status = faker.helpers.arrayElement(Statuses);

  const computeAsignee = (status: Status): Id | undefined => {
    switch (status) {
      case 'TESTING':
        return faker.helpers.arrayElement(
          FakeUserApi.getInitialData()
            .filter((x) => ['TESTER'].includes(x.position))
            .map((x) => x.id)
        );
      case 'DONE':
        return faker.helpers.arrayElement(
          FakeUserApi.getInitialData()
            .filter((x) => ['CLIENT', 'PRODUCT OWNER'].includes(x.position))
            .map((x) => x.id)
        );
      case 'IN PROGRESS':
        return faker.helpers.arrayElement(
          FakeUserApi.getInitialData()
            .filter((x) => ['DEVELOPER'].includes(x.position))
            .map((x) => x.id)
        );
      case 'TODO':
        if (Math.random() < 0.3) {
          return faker.helpers.arrayElement(
            FakeUserApi.getInitialData()
              .filter((x) => ['DEVELOPER'].includes(x.position))
              .map((x) => x.id)
          );
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const createdAt = faker.date.past({years: 0.5}).toISOString();

  return {
    id: faker.string.uuid(),
    index: index ?? 0,
    title: `${faker.helpers.arrayElement(TaskNameStart)} ${faker.lorem.words({ min: 3, max: 6 })}`,
    description: faker.lorem.paragraph({ min: 1, max: 4 }),
    createdAt,
    updatedAt: createdAt,
    creator: faker.helpers.arrayElement(
      FakeUserApi.getData()
        .filter((x) => ['PRODUCT OWNER', 'CLIENT'].includes(x.position))
        .map((x) => x.id)
    ),
    status,
    asignee: computeAsignee(status),
  };
};

export const FakeTasksApi = new FakeApi<Task>({
  generatorFunction: generate,
  dataSize: 50,
  localStorageKey: 'tasks'
});
