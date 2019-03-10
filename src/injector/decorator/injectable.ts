import {Class} from "../type/classes";
import {getRegistrator} from "../registration/registrator";
import {ClassRegistration} from "../registration/class";

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
