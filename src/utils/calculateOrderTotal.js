import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, orderItem) => {
    const pizza = pizzas.find((pizzaItem) => pizzaItem.id === orderItem.id);
    return calculatePizzaPrice(pizza.price, orderItem.size) + runningTotal;
  }, 0);
}
