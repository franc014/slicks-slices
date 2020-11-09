import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // we got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // now we access our state and updater (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addPizzaToOrder(orderedPizza) {
    setOrder([
      ...order,
      {
        id: orderedPizza.id,
        size: orderedPizza.size,
      },
    ]);
  }

  function removePizzaFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    // setMessage('go eat');

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addPizzaToOrder,
    removePizzaFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
