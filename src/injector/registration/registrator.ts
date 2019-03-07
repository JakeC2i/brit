import {Class} from "../class";
import {Registration} from "./registration";


class Registrator implements Registrator.DecoratorInterface {


  private _namespaceRegistrations = new Map<string, Set<Registration>>();


  constructor() { }


  accept(registration: Registration) {
    let ns: string = '';
    if (registration.options && registration.options.namespace) {
      ns = registration.options.namespace;
    }
    let registrationSetMaybe = this._namespaceRegistrations.get(ns);
    if (registrationSetMaybe === undefined) {
      registrationSetMaybe = new Set<Registration>();
      this._namespaceRegistrations.set(ns, registrationSetMaybe);
    }
    registrationSetMaybe.add(registration);
  }


}


export namespace Registrator {


  export interface DecoratorInterface {
    accept(registration: Registration): void;
  }


}

const registrator = new Registrator();

export function getRegistrator(): Registrator {
  return registrator;
}
