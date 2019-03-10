import {Class} from "../type/classes";
import {getRegistrator} from "../registration/registrator";
import {ClassRegistration} from "../registration/class";
import {getInstanceReadinessProxy} from "../instantiation/instance-readiness-proxy";

export function Injectable(options?: ClassRegistration.Options) {

    return function _injectable(constructor: Class) {
      getRegistrator()
        .accept(
          new ClassRegistration(
            constructor,
            options
          )
        );
    }

}

export namespace Injectable {

  export function markAsReady(klass: Class) {
    getInstanceReadinessProxy()
      .markAsReady(klass);
  }

}
