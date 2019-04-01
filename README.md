# WAITS - dependency injector

WAITS stands for **W**AITS **A**synchronous Dependency **I**njector for **T**ype**S**cript.

### What it is

It's a simple, Angular-like, reflection-based dependency injector for NodeJS.

### What it can do

Its stand-out feature is the ability to "asynchronously wait" for the synchronously constructed class
to be marked as ready, before proceeding with its injection / instantiation job with other classes.

### Prerequisites

Your `tsconfig.json` must include:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true  
  }
}
```

### Installation

```
$ npm install waits
```

### Basic usage

Decorate all class declarations (including root class) with `@Injectable`.

```typescript
// This is some dependency class
@Injectable()
export class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}

// This is the root class
@Injectable()
export class House {
  constructor(
    private _walls: Walls
  ) {
    console.log('House constructed and ready');
  }
}

// Get injector and begin the injection!
const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });
```

### Advanced usage

All other features are included in `/example/all-features.ts`.Run `npm run example`.

### TODO

* Tests
* Test browser compatibility
* Multiple injectors, remove singleton requirement
* Constructor arguments for the injectable provider
* Sync instantiation when all dependencies are sync
* Cyclic dependency detection

### License

This project is licensed under the MIT License.
