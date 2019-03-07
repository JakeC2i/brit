export abstract class Provider<TClass = any> {
  abstract provide(): TClass;
}

export type ProviderClass<TClass = any> = new() => Provider<TClass>;
