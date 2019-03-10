import {Registration} from "./registration";


class Registrator implements Registrator.DecoratorInterface {


  private _classMap: Registrator.ClassNameToRegistrationMap;
  private _providerMap: Registrator.ClassNameToRegistrationMap;


  constructor() {
    this._classMap = new Map<Registrator.ClassName, Registration>();
    this._providerMap = new Map<Registrator.ClassName, Registration>();
  }


  accept(reg: Registration) {

    let className = reg.klass.name;
    if (!className) {
      throw new Error(`${reg.toString()} is not a constructor`);
    }

    const isClassRegistration = reg.type === Registration.Type.Class;
    const map: Registrator.ClassNameToRegistrationMap
      = isClassRegistration ? this._classMap : this._providerMap;

    if (map.has(className)) {
      throw new Error(
        `${isClassRegistration ? 'Class' : 'Provider for class'} "${className}" has already been registered`
      );
    }

    map.set(className, reg);
  }


}


export namespace Registrator {

  export type ClassName = string;

  export type ClassNameToRegistrationMap = Map<ClassName, Registration>;

  export interface DecoratorInterface {
    accept(registration: Registration): void;
  }


}

const registrator = new Registrator();

export function getRegistrator(): Registrator {
  return registrator;
}
