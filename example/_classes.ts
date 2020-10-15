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
//  This is a example configuration class with some default values and dependencies
//
@Injectable()
export class DecorationInstructions {
  constructor(
    private _roof: Roof,
    private _walls: Walls
  ) {}
  roofColor: string = 'red';
  wallsColor: string = 'white';
}

//
//  This is the class that provides the config class instance
//  Arguments of the `provide` method are:
//    - when `resolve` fields is not set - constructor arguments of the provided class
//    - when  resolve` field is set - resolved dependencies defined in the parameter
//
@InjectableProvider(DecorationInstructions)
export class DecoratorInstructionsProvider implements Provider<DecorationInstructions> {

  // This would have exact same effect as now, but you can resolve other classes too!
  // resolve = [Roof, Walls];

  provide(roof: Walls, walls: Roof): DecorationInstructions {
    const instructions = new DecorationInstructions(roof, walls);
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
