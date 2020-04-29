import CartActionsTypes from './cart.types'

const INITIAL_STATE = {
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionsTypes.TOGGLE_CART_HIDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    default:
      return state;
  }
}

export default cartReducer;