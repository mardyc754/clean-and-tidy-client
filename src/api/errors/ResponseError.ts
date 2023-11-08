export class ResponseError<T> extends Error {
  private __data: T;

  constructor(message: string, data: T) {
    super(message);
    this.name = 'DataError';
    this.__data = data;
  }

  get data() {
    return this.__data;
  }
}
