import {getRegistrator, Registrator} from "./registration/registrator";
import {Injector} from "./injector";

class InjectorManager {


  private _registrator = getRegistrator();
  private _namespaceInjectors = new Map<string, Injector>();


  constructor() {}


  getInjector(namespace?: string): Injector {
    const ns = namespace ? namespace : '';
    let injectorMaybe = this._namespaceInjectors.get(ns);
    if (injectorMaybe === undefined) {
      injectorMaybe = new Injector(ns);
      this._namespaceInjectors.set(ns, injectorMaybe);
    }
    return injectorMaybe;
  }

  getRegistrator(): Registrator.DecoratorInterface {
    return this._registrator;
  }
}

const injectionManager = new InjectorManager();

export function getInjectorManager(): InjectorManager {
  return injectionManager;
}
