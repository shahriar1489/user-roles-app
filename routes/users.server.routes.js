'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('./../controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users/:userId').get(users.read);
	app.route('/users/:userId').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signupModerator').post(users.requiresLogin, users.isSysadmin, users.signup);
	
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Routes to user views
	app.route('/signin').get(users.signinView);
	
	//Routes to SysAdmin views
	app.route('/adminDashboard').get(users.requiresLogin, users.isSysadmin, users.adminDashView);	// Added by SH Miss 
	app.route('/listModerators').get(users.requiresLogin, users.isSysadmin, users.listModeratorsView); // Added by SH Miss 
	app.route('/listOrganizations').get(users.requiresLogin, users.isSysadmin, users.listOrganizationsView);	// Added for Organization 
	// Routes to Moderator 
	
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
