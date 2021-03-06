import {getRegistrator} from "../registration/registrator";
import {getInstanceReadinessProxy} from "./instance-readiness-proxy";
import {Class} from "../..";
import {ProviderClassRegistration} from "../registration/provider-class";
import {ClassRegistration} from "../registration/class";
import {ColdPromise} from "../../async/cold-promise";
import {arrayIncludes} from "../../util/array-includes";

export class Instantiator<T> {


  private readonly _registrator = getRegistrator();
  private readonly _readinessProxy = getInstanceReadinessProxy();
  private readonly _order: Class[] = [];
  private readonly _instanceMap: Instantiator.ClassToInstanceMap;


  private _resolveOrder(klass: Class) {
    if (arrayIncludes<Class>(this._order, klass))
      return;
    const reg = this._registrator.getClass(klass);
    if (reg === undefined) {
      throw new Error(`Class "${klass}" has not been registered`);
    }
    let dependencyClasses: Class[] = reg.dependencyClasses || [];
    if (this._registrator.hasProvider(klass)) {
      const providerClass = new (this._registrator.getProvider(klass) as ProviderClassRegistration).providerClass();
      if (providerClass.resolve) {
        dependencyClasses = providerClass.resolve;
      }
    }
    dependencyClasses.forEach(this._resolveOrder.bind(this));
    this._order.push(klass);
  }


  private _instantiate(): ColdPromise<T> {

    const registrator = this._registrator;

    const instantiate = (klass: Class): ColdPromise => {
      return new ColdPromise(((resolve, reject) => {
        let instance: any;
        try {
          if (registrator.hasProvider(klass)) {
            const providerRegistration = registrator.getProvider(klass) as ProviderClassRegistration;
            const classRegistration = registrator.getClass(klass) as ClassRegistration;
            const providerClass = new providerRegistration.providerClass();
            const classDependencies = providerClass.resolve ?
                providerClass.resolve.map(klass => this._instanceMap.get(klass)) :
                classRegistration.dependencyClasses.map(klass => this._instanceMap.get(klass));
            instance = providerClass.provide(...classDependencies);
          } else {
            const classRegistration = registrator.getClass(klass) as ClassRegistration;
            instance = new classRegistration.klass(
              ...classRegistration.dependencyClasses.map(klass => this._instanceMap.get(klass))
            );
          }
          this._instanceMap.set(klass, instance);
        } catch (err) {
          reject(err);
        }

        resolve(instance);
      }));
    };

    const instantiators: ColdPromise[] = this._order.map(klass => {

      const registration  = registrator.getClass(klass);
      if (registration === undefined) {
        throw new Error(`Class "${klass}" has not been registered`);
      }

      if (registration.options && registration.options.async) {
        return new ColdPromise(((resolve, reject) => {
          instantiate(klass)
            .fire()
            .then(instance => {
              this._readinessProxy.subscribe((readyClass) => {
                if (readyClass === klass) {
                  resolve(instance);
                }
              });
            })
            .catch(error => {
              reject(error);
            });
        }));
      }

      return instantiate(klass);
    });

    return new ColdPromise<T>((resolve, reject) => {
      ColdPromise.concat(instantiators)
        .fire()
        .then(() => {
          resolve(this._instanceMap.get(this._root));
          this._readinessProxy.unsubscribe();
        })
        .catch(reject);
    });
  }


  private _instantiateSync(): T {

    const registrator = this._registrator;

    const instantiate = (klass: Class): any => {
      let instance: any;
      if (registrator.hasProvider(klass)) {
        const providerRegistration = registrator.getProvider(klass) as ProviderClassRegistration;
        instance = new providerRegistration.providerClass().provide();
      } else {
        const classRegistration = registrator.getClass(klass) as ClassRegistration;
        instance = new classRegistration.klass(
          ...classRegistration.dependencyClasses.map(klass => this._instanceMap.get(klass))
        );
      }
      this._instanceMap.set(klass, instance);
      return instance;
    };

    this._order.forEach(klass => {
      instantiate(klass);
    });

    return this._instanceMap.get(this._root);
  }

  constructor(
    private _root: Class<T>
  ) {
    this._instanceMap = new Map<Class, any>();
  }

  resolveOrder(): this {
    this._resolveOrder(this._root);
    return this;
  }

  assertSynchronicity() {
    this._order.forEach(klass => {
      const registration = this._registrator.getClass(klass);
      if (registration === undefined) {
        throw new Error(`Class "${klass.name}" is not registered`);
      }
      if (registration.options && registration.options.async) {
        throw new Error(`Class "${klass.name}" cannot be constructed synchronously`);
      }
    });
  }

  instantiate(): ColdPromise<T> {
    return this._instantiate();
  }

  instantiateSync(): T {
    return this._instantiateSync();
  }

  getInstanceMap(): Instantiator.ClassToInstanceMap {
    return this._instanceMap;
  }
}

export namespace Instantiator {


  export type ClassToInstanceMap = Map<Class, InstanceType<Class>>;


}
