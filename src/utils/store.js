import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);

  const store = {
    cart: { cart, setCart },
    summ: { sum, setSum },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
