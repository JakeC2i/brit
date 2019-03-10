import {ClassRegistration} from "./class";
import {Class, Provider, ProviderClass} from "../type/classes";

export class ProviderClassRegistration<T = any> extends ClassRegistration<Provider<T>> {

  readonly providesFor: string;

  constructor(
    readonly providerClass: ProviderClass<T>,
    klass: Class<T>
  ) {
    super(providerClass);
    if (!klass.name) {
      throw new Error(`${klass.toString()} is not a constructor`);
    }
    this.providesFor = klass.name;
  }

}
