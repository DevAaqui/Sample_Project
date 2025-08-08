import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const serialize = (obj: any): string => {
  return JSON.stringify(obj);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
