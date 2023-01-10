import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

export const addToCart = () => {
  return {
    type: ADD_TO_CART,
  };
};

export const removeFromCart = () => {
  return {
    type: REMOVE_FROM_CART,
  };
};
