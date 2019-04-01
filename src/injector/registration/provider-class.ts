import {ClassRegistration} from "./class";
import {Class, Provider, ProviderClass} from "../type/classes";

export class ProviderClassRegistration<T = any> extends ClassRegistration<Provider<T>> {

  readonly providesFor: Class;

  constructor(
    readonly providerClass: ProviderClass<T>,
    klass: Class<T>
  ) {
    super(providerClass);
    this.providesFor = klass;
  }

}
