'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');




module.exports = function(app) {
	// User Routes
	var users = require('./../controllers/users.server.controller');
	var volposts = require('./../controllers/volposts.server.controller');	// Calling the modules 


	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users/:userId').get(users.read);	// to READ 
	app.route('/users/:userId').put(users.update); // to UPDATE 
	app.route('/users/accounts').delete(users.removeOAuthProvider); // to DELETE 

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
	
	//Routes to Organization views //me -> This is to view the organizations, not the volposts 
	app.route('/org/create').post(users.requiresLogin, users.isOrganization, volposts.create); // SH Miss: The one for creating Volpost -> Work on this now
	app.route('/org/read').get(); 
	app.route('/org/update').put(); 
	app.route('/org/delete').delete(); 
	
	// For the routes above, do we not need volID  
 
 /*
	app.route('/api/volposts/:volpostId')
	.get(volposts.read)
	.delete(users.requiresLogin, volposts.delete);    // NOTE: This is used to DELETE product 

	app.route('/api/volposts/edit/:volpostId')
	.get(volposts.read)
	.put(users.requiresLogin, volposts.update); // NOTE: This is to UPDATE product

	app.route('/volposts/all').get(volposts.listView); // NOTE READ all product
*/
	//app.route('/volposts/new').get(volposts.createView); // NOTE: What is this for? 
/*
	app.route('/volposts/:volpostId').get(volposts.singleView); // NOTE: READ 

*/
//	app.param('volposttId', volposts.volpostByID); // not needed 




//	app.route();   // The one for creating Donpost -> more on this later 
	
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
