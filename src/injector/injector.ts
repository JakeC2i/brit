import {getRegistrator} from "./registration/registrator";

export class Injector {


  private _registrator = getRegistrator();


  constructor(
    public readonly namespace: string
  ) {}

}
