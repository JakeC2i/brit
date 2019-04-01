import {ClassRegistration} from "./class";
import {ProviderClassRegistration} from "./provider-class";
import {Class} from "../type/classes";


class Registrator {


  private readonly _classMap: Registrator.ClassToClassRegistrationMap;
  private readonly _providerMap: Registrator.ClassToProviderClassRegistrationMap;


  private _acceptClassRegistration(registration: ClassRegistration) {
    const {klass} = registration;
    const map = this._classMap;

    if (map.has(klass)) {
      throw new Error(`Class "${klass.name}" has already been registered`);
    }

    map.set(klass, registration);
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
    this._classMap = new Map<Class, ClassRegistration>();
    this._providerMap = new Map<Class, ProviderClassRegistration>();
  }


  accept(reg: ClassRegistration | ProviderClassRegistration) {

    let {klass} = reg;

    if (reg instanceof ProviderClassRegistration) {
      return this._acceptProviderClassRegistration(reg);
    }
    return this._acceptClassRegistration(reg);
  }

  getClass(klass: Class): ClassRegistration | undefined {
    return this._classMap.get(klass);
  }

  hasProvider(klass: Class): boolean {
    return this._providerMap.has(klass);
  }

  getProvider(klass: Class): ProviderClassRegistration | undefined {
    return this._providerMap.get(klass);
  }
}


export namespace Registrator {


  export type ClassToClassRegistrationMap = Map<Class, ClassRegistration>;
  export type ClassToProviderClassRegistrationMap = Map<Class, ProviderClassRegistration>;


}

const registrator = new Registrator();

export function getRegistrator(): Registrator {
  return registrator;
}
