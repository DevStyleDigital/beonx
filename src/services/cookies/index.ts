import nookies from 'nookies';

export type Cookie = {
  get(key: string): string | undefined;
  set(key: string, value: string, options?: object): void;
  remove(
    key: string,
    options?: {
      maxAge: number;
      path: '/' | string;
    },
  ): void;
};

export const cookies: Cookie = {
  get: (key) => nookies.get(null, key)[key],
  set: (key, value, options) => nookies.set(null, key, value, options),
  remove: (key, options) => nookies.destroy(null, key, options),
};
