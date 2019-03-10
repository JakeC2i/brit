import {Class} from "./type/classes";
import {Instantiator} from "./instantiation/instantiator";

export class Injector {


  private _instanceMap: Instantiator.ClassNameToInstanceMap;


  constructor() {
    this._instanceMap = new Map<string, any>();
  }


  injectFor<T>(rootClass: Class<T>): Promise<T> {
    const instantiator = new Instantiator<T>(rootClass);
    this._instanceMap = instantiator.getInstanceMap();
    return instantiator
      .resolveOrder()
      .instantiate()
      .fire();
  }


  getInstance<T>(klass: Class<T>): T | undefined {
    return this._instanceMap.get(klass.name);
  }
}
