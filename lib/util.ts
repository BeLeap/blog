import { Just, Maybe, Nothing } from "./types.ts";

export const zipList = <A, B>(a: A[], b: B[]): Maybe<[A, B][]> => {
  if (a.length === b.length) {
    return new Just(a.map((e, i) => [e, b[i]]));
  } else {
    return new Nothing();
  }
};
