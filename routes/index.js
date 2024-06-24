let users = require('./users/index');
let profile = require('./profile/index');
let odoo = require('./odoo/index');
exports.addAPI = function (mount, app, passport, cache) {
  app.use(mount + '/users', users(passport));
  app.use(mount + '/profile', profile(passport));
  app.use(mount +'/odoo', odoo());
  
};
