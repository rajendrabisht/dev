import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomer, deleteCustomer } from '../../actions/customerActions';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination.js';

class Customer extends Component {

  constructor() {
        super();

        // an example array of 150 items to be paged
          this.state = {
            exampleItems: [],
            pageOfItems: [],
            totalCount:0,
            currentPage:1,
            pageLimit:2
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);

    }

  componentWillMount() {
    this.fetchData(this.state.currentPage);  
  }

  componentDidMount() {
  this.fetchData(this.state.currentPage);  
  }


componentWillReceiveProps(){

      if(this.props.customers.customers.data && this.state.exampleItems.length === 0){
          //console.log(this.props.customers.customers.data);
          this.setState({exampleItems:this.props.customers.customers.data});
          this.setState({totalCount:this.props.customers.customers.totalCount});        
      }
      
}
 
fetchData(page){
   this.props.getCustomer(page,this.state.pageLimit);  
}


  onDeleteClick(id) {    
    this.props.deleteCustomer(id,this.props.history);
     this.fetchData(this.state.currentPage); 
  }

onChangePage(pageOfItems,page) {
    this.fetchData(page);

   }

  render() {
   // const { user } = this.props.auth;
    const { customers, loading } = this.props.customers;
    let CustomerContent;  

    if (customers === null || loading) {
      CustomerContent =  <Spinner />;
    } else {

      // Check if logged in user has profile data  
      if(this.props.customers.customers.data){


       CustomerContent = this.props.customers.customers.data.map(cust => (
        <tr key={cust._id}>
          <td>{cust.name}</td>
          <td>{cust.address}</td>
           <td>{cust.phone}</td>       
          <td>

          <Link to={'edit-customer/'+cust._id} >Edit</Link>
            &nbsp;  &nbsp;  &nbsp;
            <button
              onClick={this.onDeleteClick.bind(this, cust._id)}
              className="btn btn-danger" >
              Delete
            </button>
          </td>
        </tr>
      ));
      }     

    }

    return (
      <div>
       <div>
           
               <h4 className="mb-4">Customer </h4>
            <Link to="/add-customer" className="btn btn-lg btn-info right">
              Add Customer
            </Link>
          </div>

     
        <table className="table" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
            </thead>         
            {CustomerContent}           
        </table>

          <Pagination items={this.state.exampleItems} totalCount={this.state.totalCount} onChangePage={this.onChangePage} />

      </div>
    );
  }
}

Customer.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  customers: state.customers,
  auth: state.auth
});

export default connect(mapStateToProps, { getCustomer, deleteCustomer })(Customer);
