import {getInjectorManager} from "../src";
import {House} from "./_classes";

// Injection
const injector = getInjectorManager().getInjector();
injector.injectFor<House>(House)
  .then((house) => {
    console.log(house);
  })
  .catch(error => {
    console.error(error);
  });
