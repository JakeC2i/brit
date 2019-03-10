export type Class<T = any> = new(...args: any[]) => T;

export abstract class Provider<TClass = any> {
  abstract provide(): TClass;
}

export type ProviderClass<T = any> = Class<Provider<T>>;
