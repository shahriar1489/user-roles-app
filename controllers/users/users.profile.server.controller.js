'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.profile);
};

//Admin Dash view controllers 
exports.adminDashView = function(req, res) {
	res.render('./../public/views/user/adminDash.ejs', {
		user: req.user || null,
		request: req
	});
};

// Moderator list view 
exports.listModeratorsView = function(req, res) {
	User.find({roles:"Moderator"}, function(err, data) {
      if (err) {
        return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
      }
      else {
      	console.log(data);
		res.render('./../public/views/user/listModerators.ejs', {
			user: req.user || null,
			moderators: data
		});
      }
    });
};

// Organization list view    
exports.listOrganizationsView = function(req, res) {
	User.find({roles:"Organization"}, function(err, data) {
      if (err) {
        return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
      }
      else {
      	console.log(data);
		res.render('./../public/views/user/listOrganizations.ejs', {	// 1/3 Done. Now make this file 
			user: req.user || null,
			organizations: data
		});
      }
    });
};