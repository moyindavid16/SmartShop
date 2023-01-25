import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const [checkoutTotal, setCheckoutTotal] = useState("₦0")
  return (
    <CartContext.Provider value={{cartItems,setCartItems, checkoutTotal, setCheckoutTotal}}>
      {children}
    </CartContext.Provider>
  )
}