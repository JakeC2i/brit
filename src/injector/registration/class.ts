import {Class} from "../type/classes";
import {Reflector} from "../reflection/reflector";

export class ClassRegistration<T = any> {

  readonly dependencyClasses: Class[];

  constructor(
    readonly klass: Class<T>,
    readonly options?: ClassRegistration.Options
  ) {
    this.dependencyClasses = Reflector.reflectConstructorDependencyClasses(klass);
  }


}

export namespace ClassRegistration {

  export interface Options {
    async?: boolean;
  }

}
