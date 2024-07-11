import {BehaviorSubject} from 'rxjs';
import {fakeDelay, range, useObservable} from "@/lib/utils.ts";

export type FakeApiData = {
  id: Id;
} & Record<string, unknown>;

export type FakeApiPagination = {
  page: number;
  size: number;
};

export type PagedData<T> = {
  items: T[];
  totalCount: number;
};

class EntryNotFoundError extends Error {
  id: string;
  status: number;
  type: string;

  constructor(id: string) {
    super(`Entry with ID ${id} not found`);
    this.id = id;
    this.status = 404;
    this.type = 'error';
  }
}

export type FakeApiFilter = {
  orderBy?: string;
  orderDir?: 'ASC' | 'DESC';
} & Record<string, unknown>;

export type FakeApiConstructor<TData extends FakeApiData> = {
  generatorFunction: (index?: number) => TData;
  delayTimer?: number;
  dataSize?: number;
};

export type Id = string;

export type FakeApiResponse = {
  id: Id;
  status: number;
  message: string;
  type: 'error' | 'success' | 'warning';
};

export interface IFakeApi<TData extends Record<string, unknown>> {
  getById: (id: Id) => Promise<TData>;
  getRandomOne: () => Promise<TData>;
  getAll: () => Promise<TData[]>;
  filter: (pagination: FakeApiPagination, filters: FakeApiFilter) => Promise<PagedData<TData>>;
  delete: (id: Id) => Promise<FakeApiResponse>;
  update: (id: Id, body: Omit<TData, 'id'>) => Promise<FakeApiResponse>;
  add: (body: Omit<TData, 'id'>) => Promise<FakeApiResponse>;
  getData: () => TData[];
  useGetData: () => TData[];
}

export class FakeApi<TData extends FakeApiData> implements IFakeApi<TData> {
  private readonly data$: BehaviorSubject<TData[]>;
  private readonly generatorFunction: (index?: number) => TData;
  private readonly delayTimer: number;
  private dataSize: number;

  constructor({generatorFunction, delayTimer = 150, dataSize = 100}: FakeApiConstructor<TData>) {
    this.generatorFunction = generatorFunction;
    this.delayTimer = delayTimer;
    this.dataSize = dataSize;
    this.data$ = new BehaviorSubject<TData[]>(range(this.dataSize).map((x) => this.generatorFunction(x)));
  }

  public getData() {
    return this.data$.getValue();
  }

  private getAndCheckIfExists = (id: Id) => {
    return this.getData()?.find((x) => x.id === id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public filter = async (pagination: FakeApiPagination, filters: FakeApiFilter): Promise<PagedData<TData>> => {
    await fakeDelay(this.delayTimer);
    console.log(filters);

    const startIndex = pagination.page * pagination.size;
    const endIndex = startIndex + pagination.size;

    return {
      items: this.getData().slice(startIndex, endIndex),
      totalCount: this.getData().length,
    };
  };

  public getAll = async (): Promise<TData[]> => {
    await fakeDelay(this.delayTimer);
    return this.getData();
  };

  public getById = async (id: Id): Promise<TData> => {
    await fakeDelay(this.delayTimer);
    const entry = this.getAndCheckIfExists(id);
    if (!entry) {
      throw new EntryNotFoundError(id)
    }
    return entry;
  };

  public getRandomOne = async (): Promise<TData> => {
    await fakeDelay(this.delayTimer);
    return this.getData()[Math.floor(Math.random() * this.getData().length)];
  };

  public delete = async (id: Id): Promise<FakeApiResponse> => {
    await fakeDelay(this.delayTimer);
    const entry = this.getAndCheckIfExists(id);
    if (!entry) {
      throw new EntryNotFoundError(id)
    }

    this.data$.next(this.getData().filter((x) => x.id !== id));
    return {
      id,
      status: 200,
      type: 'success',
      message: 'Successfully deleted',
    };
  };

  public update = async (id: Id, body: Omit<TData, 'id'>): Promise<FakeApiResponse> => {
    await fakeDelay(this.delayTimer);
    const found = this.getData().find((x) => x.id === id);

    if (!found) {
      throw new EntryNotFoundError(id)
    }

    this.data$.next(
      this.getData().map((x) => {
        if (x.id === id) {
          return {
            ...x,
            ...body,
          };
        }
        return x;
      })
    );

    return {
      id,
      status: 200,
      type: 'success',
      message: 'Successfully updated',
    };
  };

  public add = async (body: Omit<TData, 'id'>): Promise<FakeApiResponse> => {
    await fakeDelay(this.delayTimer);

    const newEntry = {
      ...this.generatorFunction(),
      ...body,
    };
    this.data$.next([...this.data$.getValue(), newEntry]);

    return {
      id: newEntry.id,
      status: 200,
      type: 'success',
      message: 'Successfully added',
    };
  };

  public useGetData = () => {
    const data = useObservable(this.data$);
    if (!data) {
      return [];
    }
    return data;
  };
}
