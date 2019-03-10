import {getInjectorManager} from "../src";
import {House} from "./_root";

const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
    console.log(house.decorations);
  })
  .catch(error => {
    console.error(error);
  });
