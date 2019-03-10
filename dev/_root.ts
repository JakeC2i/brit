import {Injectable} from "../src";
import {Roof} from "./_async";
import {Walls} from "./_sync";
import {DecorationInstructions} from "./_provider";

@Injectable()
export class House {
  constructor(
    private _roof: Roof,
    private _walls: Walls,
    public decorations: DecorationInstructions
  ) {
    console.log('House synchronously constructed and ready');
  }
}
