import {faker} from '@faker-js/faker';
import {FakeApi, Id} from "@/api/lib/fakeApi.ts";

export type Position = 'CLIENT' | 'DEVELOPER' | 'TESTER' | 'PRODUCT OWNER';
export const Positions: readonly Position[] = ['CLIENT', 'DEVELOPER', 'TESTER', 'PRODUCT OWNER'] as const;



export type User = {
  id: Id;
  fullName: string;
  position: Position;
  avatarUrl: string;
};

const generateNewUser = (): User => {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    position: faker.helpers.arrayElement(Positions),
    avatarUrl: faker.image.avatar(),
  };
};

export const FakeUserApi = new FakeApi<User>({
  generatorFunction: generateNewUser,
  dataSize: 10,
});
