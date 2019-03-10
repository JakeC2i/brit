import {getInjectorManager, Injectable} from "../src";

@Injectable() class Roof {}
@Injectable() class Walls {}

@Injectable()
class House {
  constructor(
    private _roof: Roof,
    private _walls: Walls
  ) {}
}

const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });
