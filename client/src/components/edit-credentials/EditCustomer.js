import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerById,editCustomer } from '../../actions/customerActions';

class EditCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',         
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount(){
   const customerId= this.props.match.params.id;
    this.props.getCustomerById(customerId);
    console.log(this.props);
  }

 componentWillReceiveProps(nextProps) {

  if(nextProps.errors){

  }

  if(nextProps.customer.customer.name){
     console.log(nextProps.customer.customer)
     const customerProfile= nextProps.customer.customer;   
     this.setState({
        name:customerProfile.name,
        address:customerProfile.address,
        phone:customerProfile.phone
     });
     
  }

 }


  onSubmit(e) {
    e.preventDefault();

    const expData = {
      id:this.props.match.params.id,
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone      
    };

    this.props.editCustomer(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/customer" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Company</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Job Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <TextFieldGroup
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCustomer.propTypes = {
  editCustomer: PropTypes.func.isRequired,
  getCustomerById:PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer,
  errors: state.errors
});

export default connect(mapStateToProps, { editCustomer,getCustomerById })(
  withRouter(EditCustomer)
);
