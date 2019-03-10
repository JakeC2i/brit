import {Class} from "../type/classes";

class InstanceReadinessProxy {


  private _subscriptionCallback: InstanceReadinessProxy.ReadinessCallback
    = () => {};


  markReady(klass: Class) {
    this._subscriptionCallback(klass.name);
  }

  subscribe(readinessCallback: InstanceReadinessProxy.ReadinessCallback) {
    this._subscriptionCallback = readinessCallback;
  }

  unsubscribe() {
    this._subscriptionCallback = () => {};
  };
}


export namespace InstanceReadinessProxy {

  export type ReadinessCallback = (className: string) => void;

}


const instanceReadinessProxy = new InstanceReadinessProxy();

export function getInstanceReadinessProxy(): InstanceReadinessProxy {
  return instanceReadinessProxy;
}
