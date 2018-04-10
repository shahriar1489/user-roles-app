// Controller for volunteer post 
// Latest update: 5/4/18 
// 5/4/18 12:43 -> Need to check user type is ORG for posting


var mongoose = require('mongoose');
var Volpost = require('./../models/Volpost.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.createView = function(req, res){ // The one for creating new post 
  res.render('./../public/views/volpost/new.ejs', { // -> Crea this directories
    user: req.user || null,
    request: req
  });
};

module.exports.singleView = function(req, res){ // Display for single volpost
  res.render('./../public/views/volpost/view.ejs', {
          user: req.user || null,
          request: req
        });
}

module.exports.listView = function(req, res) { // The one for all the posts regarless who posted -> sorted by 
    Volpost.find(function(err, data) {
      if (err) {
        return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
      }
      else {
        console.log("api called");

        res.render('./../public/views/volpost/all.ejs', {
          user: req.user || null,
          request: req,
          volposts: data
        });
      }
    });
};



module.exports.list = function(req, res) {
  Volpost.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var volpost = new Volpost(req.body);
  volpost.user = req.user; // get the volpost data from the user 
  
  console.log("In volposts.server.controller.js");
  console.log("volpost = " + JSON.stringify(volpost) );  //  
  
  
  volpost.save(function(err, data) {  
    if (err) {
      return res.status(400).send({ // Reason why can't post 
  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.volpost);
};


exports.delete = function(req, res) {
	var volpost = req.volpost;
	volpost.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(volpost);
		}
	});
};


module.exports.update = function(req, res) {
  var volpost = req.volpost;

  	volpost = _.extend(volpost, req.body);

  	volpost.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(volpost);
  		}
  	});
};

exports.volpostByID = function(req, res, next, id) {  // -> Used as a function in the app.param() in the routing section  
	Volpost.findById(id).populate('user', 'email').exec(function(err, volpost) {
		if (err) return next(err);
		if (!volpost) return next(new Error('Failed to load volpost ' + id));
		req.volpost = volpost;
		next();
	});
};