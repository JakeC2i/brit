import {ClassRegistration} from "./class";
import {ProviderClassRegistration} from "./provider-class";


class Registrator {


  private readonly _classMap: Registrator.ClassNameToClassRegistrationMap;
  private readonly _providerMap: Registrator.ClassNameToProviderClassRegistrationMap;


  private _acceptClassRegistration(registration: ClassRegistration) {
    const className = registration.klass.name;
    const map = this._classMap;

    if (map.has(className)) {
      throw new Error(`Class "${className}" has already been registered`);
    }

    map.set(className, registration);
  }


  private _acceptProviderClassRegistration(registration: ProviderClassRegistration) {
    const className = registration.providesFor;
    const map = this._providerMap;

    if (map.has(className)) {
      throw new Error(`Provider class for class "${className}" has already been registered`);
    }

    map.set(className, registration);
  }


  constructor() {
    this._classMap = new Map<Registrator.ClassName, ClassRegistration>();
    this._providerMap = new Map<Registrator.ClassName, ProviderClassRegistration>();
  }


  accept(reg: ClassRegistration | ProviderClassRegistration) {

    let className = reg.klass.name;
    if (!className) {
      throw new Error(`${reg.toString()} is not a constructor`);
    }

    if (reg instanceof ProviderClassRegistration) {
      return this._acceptProviderClassRegistration(reg);
    }
    return this._acceptClassRegistration(reg);
  }

  getClass(className: string): ClassRegistration | undefined {
    return this._classMap.get(className);
  }

  hasProvider(className: string): boolean {
    return this._providerMap.has(className);
  }

  getProvider(className: string): ProviderClassRegistration | undefined {
    return this._providerMap.get(className);
  }
}


export namespace Registrator {


  export type ClassName = string;
  export type ClassNameToClassRegistrationMap = Map<ClassName, ClassRegistration>;
  export type ClassNameToProviderClassRegistrationMap = Map<ClassName, ProviderClassRegistration>;


}

const registrator = new Registrator();

export function getRegistrator(): Registrator {
  return registrator;
}
