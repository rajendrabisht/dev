import {
  ADD_CUSTOMER,
  GET_CUSTOMERS,
  GET_CUSTOMER,
  DELETE_CUSTOMER,
  CUSTOMER_LOADING,
  CLEAR_CURRENT_CUSTOMER
} from '../actions/types';

const initialState = {
  customers: [],
  customer: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_LOADING:
      return {
        ...state,
        loading: true
      };
     case CLEAR_CURRENT_CUSTOMER:
      return {
        ...state,
        customers: null
      }; 
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading: false
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers]
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer._id !== action.payload)
      };
    default:
      return state;
  }
}
