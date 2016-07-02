/**
 * File: app/routes.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define application routes.
 */

var Address = require('./models/Address');
var CartItem = require('./models/CartItem');
var Category = require('./models/Category');
var Order = require('./models/Order');
var Product = require('./models/Product');

module.exports = function(app, passport) {

  // Start page:
  app.get('/', isntLoggedIn, function(req, res) {
    res.render('index');
  });

  // Login page:
  app.get('/login', isntLoggedIn, function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  // Process the login form:
  app.post('/login', passport.authenticate('login', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
  }));

  // Registration page:
  app.get('/signup', isntLoggedIn, function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // Process the signup form:
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  // Profile page, protected:
  app.get('/profile', isLoggedIn, function(req, res) {
    Address.findOne({ username: req.user.username }, function(err, address) {
      if(err) {
        res.send(err);
      }

      res.render('profile', { user : req.user, address: address });
    });
  });

  // Show the purchase history:
  app.get('/history', isLoggedIn, function(req, res) {
    Order.find({ username: req.user.username }, function(err, history) {
      if(err) {
        res.send(err);
      }
      res.render('history', { user: req.user, history: history });
    });
  });

  // Update user address:
  app.post('/address', isLoggedIn, function(req, res) {
    Address.update({ username: req.user.username }, {
      street : req.param('street'),
      number : req.param('number'),
      zipcode: req.param('zipcode'),
      city : req.param('city'),
      state : req.param('state'),
      country : req.param('country')
    }, function(err, numAffected) {
      if(err) {
        res.send(err);
      }

      Address.findOne({ username: req.user.username }, function(err, address) {
        if(err) {
          res.send(err);
        }

        res.json(address);
      });
    });
  });

  // Perform logout:
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // JS PetStore home page:
  app.get('/home', isLoggedIn, function(req, res) {
    res.render('home',  { user : req.user });
  });

  // List all products:
  app.get('/product', isLoggedIn, function(req, res) {
    Product.find(function(err, result) {
      if(err) {
        res.send(err);
      }
      res.render('product', { user : req.user, products: result });
    });
  });

  // Search products by category:
  app.get('/product/:category', isLoggedIn, function(req, res) {
    Category.findOne({
      name : req.param('category')
    }, function(err, category) {
      if (category != null) {
        Product.find({
          'category' : category['_id']
        }, function(err, result) {
          if(err) {
            res.send(err);
          }
          res.render('product', { user : req.user, products: result });
        });
      } else {
        res.redirect('/product');
      }
    });
  });

  // Search by terms:
  app.post('/product', isLoggedIn, function(req, res) {
    var list = req.param('search').split(" ");
    var regexes = [];

    for(i in list) {
      regexes[regexes.length] = new RegExp(list[i], 'i');
    }

    Product.find({
      $or : [{
        'name' : {
          $in : regexes
        }
      }, {
        'description' : {
          $in : regexes
        }
      }]
    }, function(err, result) {
      if(err) {
        res.send(err);
      }
      res.render('product',  { user : req.user, products: result });
    });
  });

  // Insert items to shopping cart:
  app.post('/cart', isLoggedIn, function(req, res) {
    var product = req.param('product');
    var quantity = Number(req.param('quantity'));
    var username = req.user.username;

    CartItem.findOne({ $and: [
      { username: username }, { product: product }
    ] }, function (err, item) {
      if(err) {
        res.send(err);
      }

      if(item != null) {
        // Increment the product quantity:
        item.quantity += quantity;

        // If the updated quantity is less than zero, remove:
        if(item.quantity > 0) {
          item.save(function(err) {
            if(err) {
              res.send(err);
            }
            res.end();
          });
        } else {
          item.remove(function(err) {
            if(err) {
              res.send(err);
            }
            res.end();
          });
        }
      } else {
        var addItem = new CartItem();

        // Insert a new item:
        addItem.product = product;
        addItem.quantity = 1;
        addItem.username = username;

        addItem.save(function (err) {
          if(err) {
            res.send(err);
          }
          res.end();
        });
      }
    });
  });

  // Display all items in shopping cart:
  app.get('/cart', isLoggedIn, function(req, res) {
    CartItem.find({ $query: { username: req.user.username }, $orderby: { product: 1 } }, function(err, items) {
      var products = [];

      for(i in items) {
        products[products.length] = items[i].product;
      }

      Product.find({ $query: { _id: { $in: products } }, $orderby: { _id: 1 } }, function(err, result) {
        var total = 0, list = [];

        for(i in result) {
          list[list.length] = {
            'id' : result[i]._id,
            'name' : result[i].name,
            'price' : result[i].price,
            'quantity' : items[i].quantity
          };

          total += (result[i].price * items[i].quantity);
        }

        res.render('cart', { user: req.user, cart: list, total: total });
      });
    });
  });

  // Show the order report:
  app.get('/order', isLoggedIn, function(req, res) {
    Address.findOne({ username: req.user.username }, function (err, address) {
      if(err) {
        req.send(err);
      }

      CartItem.find({ $query: { username: req.user.username }, $orderby: { product: 1 } },
                    function(err, items) {
        var products = [];

        for(i in items) {
          products[products.length] = items[i].product;
        }

        Product.find({ $query: { _id: { $in: products } }, $orderby: { _id: 1 } }, function(err, result) {
          var total = 0, list = [];

          for(i in result) {
            list[list.length] = {
              'id' : result[i]._id,
              'name' : result[i].name,
              'price' : result[i].price,
              'quantity' : items[i].quantity,
              'subtotal' : result[i].price * items[i].quantity
            };

            total += list[list.length-1].subtotal;
          }
          res.render('order', { user: req.user, products: list, total: total, address: address });
        });
      });
    });
  });

  // Insert a new order in database:
  app.post('/order', isLoggedIn, function(req, res) {
    Order.create({
      username: req.user.username,
      date: new Date(),
      address: req.param('address'),
      items: req.param('items'),
      total: req.param('total')
    }, function(err, order) {
      if(err) {
        res.send(err);
      }

      CartItem.remove({ username: req.user.username }, function(err) {
        if(err) {
          res.send(err);
        }

        res.json(order);
      });
    });
  });

  // Report the last order performed:
  app.get('/report/:order', isLoggedIn, function(req, res) {
    Order.findOne({ $and: [{ _id: req.param('order') },
                           { username: req.user.username }]
                  }, function(err, result) {
      if(err) {
        res.send(err);
      }

      if(result != null) {
        res.render('report', { user: req.user, order: result });
      } else {
        res.redirect('/home');
      }
    });
  });

  app.get
};

// Route middleware to check if a user is logged in:
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

// Route middleware to check if a user is not logged in:
function isntLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/home');
}
