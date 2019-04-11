import {Injectable, InjectableProvider, Provider} from "../src";

//
//  Just an regular (synchronous) injectable
//
@Injectable()
export class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}

//
//  Yet another regular injectable...
//
@Injectable()
export class Woodwork {
  constructor() {
    console.log('Woodwork constructed synchronously and ready');
  }
}

//
//  Now it's asynchronously waiting injectable!
//
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

//
//  This is a example configuration class with some default values
//
@Injectable()
export class DecorationInstructions {
  roofColor: string = 'red';
  wallsColor: string = 'white';
}

//
//  This is the class that provides the config class instance
//
@InjectableProvider(DecorationInstructions)
export class DecoratorInstructionsProvider implements Provider<DecorationInstructions> {
  provide(): DecorationInstructions {
    const instructions = new DecorationInstructions();
    instructions.roofColor = 'blue';
    instructions.wallsColor = 'yellow';
    return instructions;
  }
}

//
//  Root asynchronous class
//
@Injectable()
export class House {
  constructor(
    private _roof: Roof,                        // Async
    private _walls: Walls,                      // Sync
    public decorations: DecorationInstructions  // Being provided
  ) {
    console.log('House constructed and ready');
  }
}

//
//  Root synchronous class
//
@Injectable()
export class SyncHouse {

  constructor(
    private _walls: Walls,
    private _woodwork: Woodwork
  ) {
    console.log('SyncHouse constructed synchronously and ready');
  }

}
