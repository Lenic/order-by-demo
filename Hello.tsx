import type { FC } from 'react';

import React from 'react';

import { OrderConfig } from './orderBy';

const cityData = [
  { id: 7, name: 'Amsterdam', population: 750000, country: 'Netherlands' },
  { id: 12, name: 'The Hague', population: 450000, country: 'Netherlands' },
  { id: 43, name: 'Rotterdam', population: 600000, country: 'Netherlands' },
  { id: 5, name: 'Berlin', population: 3000000, country: 'Germany' },
  { id: 42, name: 'Düsseldorf', population: 550000, country: 'Germany' },
  { id: 44, name: 'Stuttgard', population: 600000, country: 'Germany' },
];

type ArrayElement<ArrayType extends unknown[]> =
  ArrayType extends (infer ElementType)[] ? ElementType : never;

type ElementType = ArrayElement<typeof cityData>;

const Hello: FC<{ name: string }> = ({ name }) => {
  const list = cityData.concat().sort(
    OrderConfig.create<ElementType>()
      .orderBy((x, y) => y.name.length - x.name.length)
      .thenBy('country', -1)
      .thenBy('id', 1)
  );

  return (
    <ul>
      {list.map((v) => (
        <li key={v.id}>{JSON.stringify(v)}</li>
      ))}
    </ul>
  );
};

export default Hello;
