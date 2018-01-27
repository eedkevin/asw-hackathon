import { ADD_PRODUCT_IN_CART, REMOVE_PRODUCT_IN_CART, UPDATE_PRODUCT_IN_CART } from './actions';

const initialState = {
  items: {},
  prevSum: 0,
  sum: 0,
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_IN_CART: {
      const newItems = {
        ...state.items,
        [action.payload.productID]: {
          price: action.payload.price,
          count: (state.items[action.payload.productID] ? state.items[action.payload.productID].count : 0) + 1,
        },
      };
      return {
        ...state,
        items: newItems,
        prevSum: state.sum,
        sum: state.sum + action.payload.price, 
      };
    }
    case REMOVE_PRODUCT_IN_CART: {
      const newItems = {
        ...state.items,
        [action.payload.productID]: {
          price: action.payload.price,
          count: Math.max(0, (state.items[action.payload.productID] ? state.items[action.payload.productID].count : 0) - 1),
        },
      };
      return {
        ...state,
        items: newItems,
        prevSum: state.sum,
        sum: state.sum - ((!state.items[action.payload.productID] || state.items[action.payload.productID].count === 0) ? 0 : action.payload.price),
      };
    }
    case UPDATE_PRODUCT_IN_CART: {
      const newItems = {
        ...state.items,
        [action.payload.productID]: {
          price: action.payload.price,
          count: Math.max(0, action.payload.quantity),
        },
      };
      return {
        ...state,
        items: newItems,
        prevSum: state.sum,
        sum: Object.keys(newItems).reduce((sum, v) => sum + newItems[v].count * newItems[v].price, 0),
      };
    }
    default:
      return state;
  }
}
