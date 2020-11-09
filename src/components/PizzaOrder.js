import GatsbyImage from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((orderItem, index) => {
        const pizza = pizzas.find((pizzaItem) => pizzaItem.id === orderItem.id);
        return (
          <MenuItemStyles key={`${orderItem.id}-${index}`}>
            <GatsbyImage
              fluid={pizza.image.asset.fluid}
              width="50"
              height="50"
              alt={pizza.name}
            />
            <div>
              <h2>{pizza.name} .</h2>
            </div>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, orderItem.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${orderItem.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
