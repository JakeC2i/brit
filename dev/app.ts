import {getInjectorManager, Injectable} from "../src";

@Injectable({async: true})
class Roof {
  constructor() {
    console.log('Roof constructed synchronously, but not ready yet');
    setTimeout(() => {
      console.log('Roof asynchronously marked as ready');
      Injectable.markReady(Roof);
    }, 2000);
  }
}
@Injectable() class Walls {
  constructor() {
    console.log('Walls constructed synchronously and ready');
  }
}

@Injectable()
class House {
  constructor(
    private _roof: Roof,
    private _walls: Walls
  ) {
    console.log('House synchronously constructed and ready');
  }
}

const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });
