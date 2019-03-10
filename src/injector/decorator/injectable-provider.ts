import {Class, ProviderClass} from "../type/classes";
import {getRegistrator} from "../registration/registrator";
import {ProviderClassRegistration} from "../registration/provider-class";


export function InjectableProvider(classBeingProvided: Class) {

  return function _provider(providerClass: ProviderClass) {
    getRegistrator()
      .accept(
        new ProviderClassRegistration(
          providerClass,
          classBeingProvided
        )
      );
  }

}
