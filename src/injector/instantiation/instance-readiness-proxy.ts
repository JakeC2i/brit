import {Class} from "../type/classes";

class InstanceReadinessProxy {


  private _subscriptionCallback: InstanceReadinessProxy.ReadinessCallback
    = () => {};


  markAsReady(klass: Class) {
    this._subscriptionCallback(klass);
  }

  subscribe(readinessCallback: InstanceReadinessProxy.ReadinessCallback) {
    this._subscriptionCallback = readinessCallback;
  }

  unsubscribe() {
    this._subscriptionCallback = () => {};
  };
}


export namespace InstanceReadinessProxy {

  export type ReadinessCallback = (klass: Class) => void;

}


const instanceReadinessProxy = new InstanceReadinessProxy();

export function getInstanceReadinessProxy(): InstanceReadinessProxy {
  return instanceReadinessProxy;
}
