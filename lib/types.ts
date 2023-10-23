export type Maybe<T> = Just<T> | Nothing;

export class Just<T> {
  __kind = "Just";
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  unwrap() {
    return this.value;
  }

  static isJust<T>(target: Maybe<T>): target is Just<T> {
    if (target.__kind === "Just") {
      return true;
    } else {
      return false;
    }
  }
}

export class Nothing {
  __kind = "Nothing";

  constructor() {}

  unwrap() {
    throw new Error("Can not unwrap Nothing");
  }
}
