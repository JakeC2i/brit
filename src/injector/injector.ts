export class Injector {

  /**
   * Singleton pattern
   */

  private static _instance: Injector;
  private constructor() {}
  public static getInstance(): Injector {
    if (!Injector._instance) {
      Injector._instance = new Injector();
    }
    return Injector._instance;
  }

}
