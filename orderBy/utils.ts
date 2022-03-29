import type { OrderComparer, OrderOptions, OrderSequence } from './types';

export const makeComparer = <T>(
  key: keyof T,
  config?: OrderOptions | OrderSequence
): OrderComparer<T> => {
  const { desc = false, ignoreCase = false } =
    typeof config === 'string' || typeof config === 'number'
      ? { desc: config === 'desc' || config === -1 }
      : config || {};

  const getValue = (target: T) => {
    const propertyValue = target[key];

    if (ignoreCase) {
      return typeof propertyValue === 'string'
        ? propertyValue.toLowerCase()
        : propertyValue;
    }

    return propertyValue;
  };

  const greatThanValue = desc ? -1 : 1;
  const lessThanValue = desc ? 1 : -1;

  return (x: T, y: T) => {
    const leftValue = getValue(x);
    const rightValue = getValue(y);

    return leftValue > rightValue
      ? greatThanValue
      : leftValue < rightValue
      ? lessThanValue
      : 0;
  };
};
