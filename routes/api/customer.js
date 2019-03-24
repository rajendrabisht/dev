const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//8650301963 ganesh 

// Customer model
const Customer = require('../../models/Customer');
// Profile model

// Validation
const validateCustomerInput = require('../../validation/customer');


// @route   GET api/customers
// @desc    Get customers
// @access  Public
router.post('/', (req, res) => {


var pageNo = parseInt(req.body.pageNo)
var size = parseInt(req.body.size)
  //var size = 2
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
     response = {"error" : true,"message" : "invalid page number, should start with 1"};
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents 

  Customer.count()
  .then(totalCount=> {

    Customer.find({},{},query)
    .then(data => {
         var totalPages = Math.ceil(totalCount / size);
        response = {"error" : false,"data" : data,"pages": totalPages,"totalCount": totalCount};
       res.json(response);
      }).catch(error=> res.status(404).json({ noCustomerfound: 'No customers found' }));


  }).catch(error=> res.status(404).json({ noCustomerfound: 'No customers count found' }));




});

// @route   GET api/customers/:id
// @desc    Get customers by id
// @access  Public
router.get('/:id', (req, res) => {
  Customer.findById(req.params.id)
    .then(customers => {
      if (customers) {
        res.json(customers);
      } else {
        res.status(404).json({ nopostfound: 'No customers found with that ID' })
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'No customers found with that ID' })
    );
});

// @route   POST api/customer
// @desc    Create customer
// @access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCustomerInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

// update if id

    if(req.body.id){

        const customerFields = {};
        customerFields.name=req.body.name;
        customerFields.address=req.body.address;
        customerFields.phone=req.body.phone;

       Customer.findOneAndUpdate(
          { _id: req.body.id },
          { $set: customerFields },
          { new: true }
        ).then(customer => res.json(customer));


    }else{

      const newCustomer = new Customer({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        user: req.user.id
      });
      newCustomer.save().then(customer => res.json(customer));

    }

  }
);

// @route   DELETE api/customer/:id
// @desc    Delete customer
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

      Customer.findById(req.params.id)
        .then(customer => {
          // Check for post owner
          if (customer.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          customer.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No customer found' }));
   
  }
);

module.exports = router;
