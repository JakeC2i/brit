import {Registration} from "../injector/registration/registration";
import {Class} from "../injector/class";
import {getRegistrator} from "../injector/registration/registrator";

export function Injectable(options?: Registration.ClassOptions) {

    return function _injectable(constructor: Class) {
      getRegistrator()
        .accept(
          new Registration(
            Registration.Type.Class,
            constructor,
            options
          )
        );
    }

}
