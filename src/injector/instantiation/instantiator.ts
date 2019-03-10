import {getRegistrator, Registrator} from "../registration/registrator";
import {Class} from "../type/classes";
import {ProviderClassRegistration} from "../registration/provider-class";
import {ClassRegistration} from "../registration/class";
import {ColdPromise} from "../../async/cold-promise";

export class Instantiator<T> {

  private readonly _registrator = getRegistrator();
  private readonly _order: Registrator.ClassName[] = [];
  private readonly _instanceMap: Instantiator.ClassNameToInstanceMap;


  private _resolveOrder(className: string) {
    if (this._order.includes(className))
      return;
    const reg = this._registrator.getClass(className);
    if (reg === undefined) {
      throw new Error(`Class "${className}" has not been registered`);
    }
    (reg.dependencyNames || []).forEach(this._resolveOrder.bind(this));
    this._order.push(className);
  }


  private _instantiate(): ColdPromise<T> {

    const registrator = this._registrator;

    const instantiate = (className: string): ColdPromise => {
      return new ColdPromise(((resolve, reject) => {
        let instance: any;
        try {
          if (registrator.hasProvider(className)) {
            const providerRegistration = registrator.getProvider(className) as ProviderClassRegistration;
            instance = new providerRegistration.providerClass().provide();
          } else {
            const classRegistration = registrator.getClass(className) as ClassRegistration;
            instance = new classRegistration.klass(
              ...classRegistration.dependencyNames.map(name => this._instanceMap.get(name))
            );
          }
          this._instanceMap.set(className, instance);
        } catch (err) {
          reject(err);
        }

        resolve(instance);
      }));
    };

    const instantiators: ColdPromise[] = this._order.map(className => {

      const registration  = registrator.getClass(className);
      if (registration === undefined) {
        throw new Error(`Class "${className}" has not been registered`);
      }

      if (registration.options && registration.options.async) {
        throw new Error('Asynchronous injection not implemented!');
      }

      return instantiate(className);
    });

    return new ColdPromise<T>((resolve, reject) => {
      ColdPromise.concat(instantiators)
        .fire()
        .then(() => {
          resolve(this._instanceMap.get(this._root.name));
        })
        .catch(reject);
    });
  }

  constructor(
    private _root: Class<T>
  ) {
    this._instanceMap = new Map<string, any>();
  }

  resolveOrder(): this {
    this._resolveOrder(this._root.name);
    return this;
  }

  instantiate(): ColdPromise<T> {
    return this._instantiate();
  }

  getInstanceMap(): Instantiator.ClassNameToInstanceMap {
    return this._instanceMap;
  }
}

export namespace Instantiator {


  export type ClassNameToInstanceMap = Map<string, any>;


}
