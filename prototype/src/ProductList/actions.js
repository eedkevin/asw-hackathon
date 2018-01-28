export const ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART';
export const UPDATE_PRODUCT_IN_CART = 'UPDATE_PRODUCT_IN_CART'
export const REMOVE_PRODUCT_IN_CART = 'REMOVE_PRODUCT_IN_CART'

export const addProductInCart = (productID, price, name) => ({
  type: ADD_PRODUCT_IN_CART,
  payload: { productID, price, name },
});

export const removeProductInCart = (productID, price, name) => ({
  type: REMOVE_PRODUCT_IN_CART,
  payload: { productID, price, name },
});

export const updateProductInCart = (productID, price, name, quantity) => ({
  type: UPDATE_PRODUCT_IN_CART,
  payload: { productID, quantity, price, name },
});
