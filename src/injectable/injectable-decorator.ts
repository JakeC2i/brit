import {Registration} from "../injector/registration/registration";
import {Class} from "../injector/class";
import {getInjectorManager} from "../injector/injector-manager";

export function Injectable(options?: Registration.ClassOptions) {

    return function _injectable(constructor: Class) {

      getInjectorManager()
        .getRegistrator()
        .accept(
          new Registration(
            Registration.Type.Class,
            constructor,
            options
          )
        );

    }

}
