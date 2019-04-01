import {Class} from "./type/classes";
import {Instantiator} from "./instantiation/instantiator";

export class Injector {


  private _instanceMap: Instantiator.ClassToInstanceMap;


  constructor() {
    this._instanceMap = new Map<Class, any>();
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
    return this._instanceMap.get(klass);
  }
}
