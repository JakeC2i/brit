export type Class<T = any> = new(...args: any[]) => T;

export abstract class Provider<TClass = any> {
  abstract resolve?: Class[];
  abstract provide(...args: any[]): TClass;
}

export type ProviderClass<T = any> = Class<Provider<T>>;
