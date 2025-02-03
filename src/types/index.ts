export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends Array<any>
        ? `${K}`
      // eslint-disable-next-line ts/no-unsafe-function-type
        : T[K] extends Function
          ? never
          : `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    }[keyof T & (string | number)]
  : never
