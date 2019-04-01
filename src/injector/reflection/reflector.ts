import 'reflect-metadata';
import {Class} from "../type/classes";

export class Reflector {


  static reflectConstructorDependencyClasses(constructor: Class): Class[] {
    const argTypeConstructors: Class[] | undefined
      = Reflect.getMetadata('design:paramtypes', constructor);
    if (!argTypeConstructors) {
      return [];
    }
    return argTypeConstructors;
  }


}
