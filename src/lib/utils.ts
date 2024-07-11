import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {useEffect, useState} from "react";
import {Observable} from "rxjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fakeDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useObservable = <T,>(observable: Observable<T>): T | undefined => {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
};

export const range = (len: number) => Array.from(Array(len).keys());


export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input;
  }

  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
