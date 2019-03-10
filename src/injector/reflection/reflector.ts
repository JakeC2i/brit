import 'reflect-metadata';
import {Class} from "../type/classes";

export class Reflector {


  static reflectConstructorDependencyNames(constructor: Class): string[] {
    const argTypeConstructors: any[] = Reflect.getMetadata('design:paramtypes', constructor);
    if (!argTypeConstructors) {
      return [];
    }
    return argTypeConstructors.map((argumentConstructor, i) => {
      if (!argumentConstructor.name) {
        throw new Error(`Could not reflect "${constructor.name}" constructor argument at index ${i}`);
      }
      return argumentConstructor.name;
    });
  }


}
