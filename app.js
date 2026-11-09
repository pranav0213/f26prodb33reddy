require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/product');

const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connection to DB succeeded');
    seedProducts();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

async function seedProducts() {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany([
        {
          name: 'Laptop',
          category: 'Electronics',
          price: 850
        },
        {
          name: 'Headphones',
          category: 'Accessories',
          price: 75
        },
        {
          name: 'Keyboard',
          category: 'Accessories',
          price: 45
        }
      ]);

      console.log('Three products saved successfully');
    } else {
      console.log('Products already exist');
    }
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var monumentsRouter = require('./routes/monuments');
var pickRouter = require('./routes/pick');
var gridRouter = require('./routes/grid');
const resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/monuments', monumentsRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
