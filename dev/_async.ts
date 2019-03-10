import {Injectable} from "../src";

@Injectable({async: true})
export class Roof {
  constructor() {
    console.log('Roof constructed synchronously, but not ready yet');
    setTimeout(() => {
      console.log('Roof asynchronously marked as ready');
      Injectable.markAsReady(Roof);
    }, 2000);
  }
}
