export class ColdPromise<T = any> {

  constructor(
    private _executor: ColdPromise.Executor<T>
  ) {}

  fire(): Promise<T> {
    return new Promise(this._executor);
  }

  static concat<T = any>(coldPromises: ColdPromise<T>[]): ColdPromise<T[]> {
    return new ColdPromise<T[]>((resolve, reject) => {
      let pointer = 0;
      const values: T[] = [];
      const invoker = () => {
        if (pointer == coldPromises.length) {
          return resolve(values);
        }
        const cp = coldPromises[pointer];
        cp.fire()
          .then(value => {
            values.push(value);
            pointer++;
            invoker();
          })
          .catch(err => {
            reject(err);
          });
      };
      invoker();
    });
  }
}

export namespace ColdPromise {

  export type Executor<T> = (
    resolve: (value: T) => void,
    reject: (error: Error) => void
  ) => void;

}
