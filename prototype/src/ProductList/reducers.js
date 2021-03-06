import { ADD_PRODUCT_IN_CART, REMOVE_PRODUCT_IN_CART, UPDATE_PRODUCT_IN_CART, SET_RECOMMENDED_ITEMS } from './actions';

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
          name: action.payload.name,
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
          name: action.payload.name,
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
          name: action.payload.name,
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
    case SET_RECOMMENDED_ITEMS: {
      return {
        ...state,
        rec: [ ...action.payload.items ],
      };
    }
    default:
      return state;
  }
}
