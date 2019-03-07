import {Class} from "../class";
import {ProviderClass} from "../../provider/provider";

export class Registration {

  readonly type: Registration.Type;
  readonly klass: Class;
  readonly options?: Registration.ClassOptions | Registration.ProviderOptions;
  readonly provider?: ProviderClass;

  constructor(type: Registration.Type.Class, klass: Class, options?: Registration.ClassOptions);
  constructor(type: Registration.Type.Provider, klass: Class, providerClass: ProviderClass, options?: Registration.ProviderOptions)
  constructor(
    type: Registration.Type,
    klass: Class,
    optionsOrProvider?: Registration.ClassOptions | ProviderClass,
    providerOptions?: Registration.ProviderOptions
  ) {
    this.type = type;
    this.klass = klass;
    if (this.type === Registration.Type.Class) {
      this.options = optionsOrProvider as Registration.ClassOptions;
    } else {
      this.provider = optionsOrProvider as ProviderClass;
      this.options = providerOptions;
    }
  }


}


export namespace Registration {


  export enum Type {
    Class,
    Provider
  }

  export interface Options {
    namespace?: string;
  }

  export interface ClassOptions extends Options {
    async?: boolean;
  }

  export interface ProviderOptions extends Options {

  }
}
