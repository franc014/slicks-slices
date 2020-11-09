import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items }) {

  return (
    <ItemsGrid>
      {items.map((item, index) => (
        <ItemStyles key={`${index}-${item}`}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="300"
            src={`${item.image.asset.url}?w=400&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
