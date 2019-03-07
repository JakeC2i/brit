import {getInjectorManager} from "../src/injector/injector-manager";

console.log('WAITS development app running');

const manager = getInjectorManager();
const injector = manager.getInjector();
const registrator = manager.getRegistrator();
