import {getInjectorManager, Injectable, InjectableProvider, Provider} from "../src";

//
//  Injectable
//
@Injectable()
export class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}

//
//  Asynchronously waiting injectable
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
//  Example configuration class with default values
//
@Injectable()
export class DecorationInstructions {
  roofColor: string = 'red';
  wallsColor: string = 'white';
}

//
//  Class that provides the config class instance
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
//  Root class
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

// Injection
const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });
