'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		user.password = undefined;
   user.salt = undefined;
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
		if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};

/* Authorize different roles */
exports.isSysadmin = function(req, res, next) {
		if (req.user.roles !== "Sysadmin") {
		return res.status(401).send({
			message: 'User is not an authorized Sysadmin'
		});
	}
	next();
};

// Authorize Moderator *//*
// at users.authorization.server.controller.js
exports.isOrganization = function(req, res, next) {
		if (req.user.roles !== "Moderator") {
		return res.status(401).send({
			message: 'User is not an authorized Moderator'  // display this message at the web page 
		});
	}
	next();
};


// Authorize Org *//*
// at users.authorization.server.controller.js
exports.isOrganization = function(req, res, next) {
		if (req.user.roles !== "Organization") {
		return res.status(401).send({
			message: 'User is not an authorized Organization'  // display this message at the web page 
		});
	}
	next();
};

// Authorize Vol *//*
// at users.authorization.server.controller.js
exports.isVolunteer = function(req, res, next) {
		if (req.user.roles !== "Volunteer") {
		return res.status(401).send({
			message: 'User is not an authorized Volunteer'  // display this message at the web page 
		});
	}
	next();
};
