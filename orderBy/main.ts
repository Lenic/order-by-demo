import type {
  OrderAction,
  OrderComparer,
  OrderExecutor,
  OrderOptions,
  OrderSequence,
} from './types';

import { makeComparer } from './utils';

function executor<T>(
  keyOrComparer: OrderComparer<T> | keyof T,
  config?: OrderOptions | OrderSequence
): OrderExecutor<T> {
  const comparer =
    typeof keyOrComparer === 'function'
      ? keyOrComparer
      : makeComparer(keyOrComparer, config);

  // @ts-ignore
  const self = this;
  const func = (x: T, y: T) => {
    if (typeof self === 'function') {
      const res = (self as OrderComparer<T>)(x, y);

      return res === 0 ? comparer(x, y) : res;
    } else {
      return comparer(x, y);
    }
  };

  func.thenBy = executor;
  return func;
}

export class OrderConfig<T> implements OrderAction<T> {
  static create<T>() {
    return new OrderConfig<T>();
  }

  orderBy(
    keyOrComparer: OrderComparer<T> | keyof T,
    config?: OrderOptions | OrderSequence
  ) {
    return executor<T>(keyOrComparer, config);
  }
}
