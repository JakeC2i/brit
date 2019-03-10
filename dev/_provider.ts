import {Injectable, InjectableProvider, Provider} from "../src";

@Injectable()
export class DecorationInstructions {
  roofColor: string = 'red';
  wallsColor: string = 'white';
}

@InjectableProvider(DecorationInstructions)
export class DecoratorInstructionsProvider implements Provider<DecorationInstructions> {
  provide(): DecorationInstructions {
    const instructions = new DecorationInstructions();
    instructions.roofColor = 'blue';
    instructions.wallsColor = 'yellow';
    return instructions;
  }
}
