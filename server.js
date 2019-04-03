const express = require('express');
const mongoose = require('mongoose');
const mongodbErrorHandler  = require('mongoose-mongodb-errors')
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const customers = require('./routes/api/customer');
require('express-async-error');

mongoose.plugin(mongodbErrorHandler);

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/customers', customers);


// error for 404

app.use((req,res,next)=>{
	req.status=404;
	const error = new Error('Router not found');
	next(error);

});

// error handler

app.use((error,req,res,next)=>{

	res.status(req.status || 500).send({
		message:error.message,
		stack:error
	})

});



// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
