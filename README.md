# WAITS - dependency injector

WAITS stands for **W**AITS **A**synchronous Dependency **I**njector for **T**ype**S**cript.

### What it is

It's a simple, Angular-like, reflection-based dependency injector for NodeJS.

### What's all the fuss about

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

### Usage

First, decorate all class declarations with `@Injectable`.

#### Synchronously injected classes

```typescript
@Injectable()
export class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}
```

#### "Asynchronously injected" classes

These classes will be constructed as all others, but the injector will wait for the class
to be marked as ready before continuing with injection process.

```typescript

@Injectable({async: true})             // Notice the option
export class Roof {
  constructor() {
    console.log('Roof constructed synchronously, but not ready yet');
    setTimeout(() => {
      console.log('Roof asynchronously marked as ready');
      Injectable.markAsReady(Roof);    // The injector waits for this call before continuing
    }, 2000);
  }
}
```

#### Injectable providers

Sometimes you want to have control of the instance of a class, before it's
injected into other classes.

For example, there is some class responsible for configuration of your app.
Without your intervention, it will use default configuration values.
Injectable provider lets you manually instantiate that class so you can
override these values, and provide that class instance for the injector to use.

```typescript

// This is our configuration class, it uses some default values
@Injectable()
export class DecorationInstructions {
  roofColor: string = 'red';
  wallsColor: string = 'white';
}

// This is the class that provides the instance of the configuration class
@InjectableProvider(DecorationInstructions)
export class DecoratorInstructionsProvider implements Provider<DecorationInstructions> {
  provide(): DecorationInstructions {
    const instructions = new DecorationInstructions();
    instructions.roofColor = 'blue';
    instructions.wallsColor = 'yellow';
    return instructions;
  }
}
```

**The provider class cannot have any constructor arguments** (at least for now).

#### The Injection

After all classes are properly decorated, you need to specify the root class
for which all dependencies will be resolved and injected into. This class also
have to be `@Injectable` decorated.

Then, get the injector and make use of it.

```typescript

// This is the root class
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

// The injector manager is there because of reasons
const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });

```

#### Working example

Combine all above code examples and execute them, and you'll see how it works.

### TODO

* Tests
* Test browser compatibility
* Multiple injectors, remove singleton requirement
* Constructor arguments for the injectable provider
* Cyclic dependency detection

### License

This project is licensed under the MIT License.
