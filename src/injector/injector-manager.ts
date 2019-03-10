import {getRegistrator} from "./registration/registrator";
import {Injector} from "./injector";

class InjectorManager {


  private _registrator = getRegistrator();
  private _injector = new Injector();


  constructor() {}


  getInjector(): Injector {
    return this._injector;
  }


}

const injectionManager = new InjectorManager();

export function getInjectorManager(): InjectorManager {
  return injectionManager;
}
