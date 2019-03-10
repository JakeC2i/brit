import {Injectable} from "../src";

@Injectable()
export class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}
