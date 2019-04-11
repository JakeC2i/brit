import {getInjectorManager} from "../src";
import {SyncHouse} from "./_classes";

// Synchronous injection
const injector = getInjectorManager().getInjector();
const syncHouse = injector.injectForSync<SyncHouse>(SyncHouse);

console.log(syncHouse);
