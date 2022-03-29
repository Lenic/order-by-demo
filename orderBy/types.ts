export type OrderSequence = 'asc' | 'desc' | 1 | -1;

export interface OrderOptions {
  desc?: boolean;
  ignoreCase?: boolean;
}

export interface OrderComparer<T> {
  (x: T, y: T): number;
}

export interface OrderExecutor<T> extends OrderComparer<T> {
  thenBy(comparer: OrderComparer<T>): OrderExecutor<T>;
  thenBy(key: keyof T, config?: OrderOptions | OrderSequence): OrderExecutor<T>;
}

export interface OrderAction<T> {
  orderBy(comparer: OrderComparer<T>): OrderExecutor<T>;
  orderBy(
    key: keyof T,
    config?: OrderOptions | OrderSequence
  ): OrderExecutor<T>;
}
