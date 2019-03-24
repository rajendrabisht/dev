import axios from 'axios';

import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  CUSTOMER_LOADING,
  CLEAR_CURRENT_CUSTOMER,
  GET_ERRORS  
} from './types';



// Get current Customer
export const getCustomer = (pageNo,size) => dispatch => {
  dispatch(setCustomerLoading());
  axios
    .post('/api/customers',{pageNo:pageNo,size:size})
    .then(res =>{
      
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: err
      })
    );
};

// get current Customer

export const getCustomerById = (id) => dispatch =>{

  dispatch(setCustomerLoading());
  axios
  .get(`/api/customers/${id}`)
  .then(res => dispatch({ type:GET_CUSTOMER , payload:res.data }) )
  .catch(err => dispatch({ type: GET_ERRORS , payload:{} }));

}


// Add experience
export const addCustomer = (expData, history) => dispatch => {
  axios
    .post('/api/customers/add', expData)
    .then(res => history.push('/customer'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Edit Customer
export const editCustomer = (expData, history) => dispatch => {
  axios
    .post('/api/customers/add', expData)
    .then(res => history.push('/customer'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteCustomer = id => dispatch => {
    dispatch(setCustomerLoading());
  axios
    .delete(`/api/customers/${id}`)
    .then(res =>
      dispatch({
        type: GET_CUSTOMER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





// Profile loading
export const setCustomerLoading = () => {
  return {
    type: CUSTOMER_LOADING
  };
};

// Clear profile
export const clearCurrentCustomer = () => {
  return {
    type: CLEAR_CURRENT_CUSTOMER
  };
};
