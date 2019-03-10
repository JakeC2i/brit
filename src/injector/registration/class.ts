import {Class} from "../type/classes";
import {Reflector} from "../reflection/reflector";

export class ClassRegistration<T = any> {

  readonly dependencyNames: string[];

  constructor(
    readonly klass: Class<T>,
    readonly options?: ClassRegistration.Options
  ) {
    this.dependencyNames = Reflector.reflectConstructorDependencyNames(klass);
  }


}

export namespace ClassRegistration {

  export interface Options {
    async?: boolean;
  }

}
