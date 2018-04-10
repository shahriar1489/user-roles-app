'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
        default: '',
        required: 'First Name required'
      },

    lastName: {
        type: String,
        trim: true,
        default: '',
        required: 'Last Name required'
      },

    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email required'
    },
    username: {
        type: String,
        trim: true,
        required: 'User Name required'
    },
    photo: {
        type: String,
        default: 'http://www.ee-ip.org/sites/default/files/default_images/default-user.png',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    
    
// Social Media    
    linkedin: {
        type: String,
        default: '',
        trim: true
    },
    twitter: {
        type: String,
        default: '',
        trim: true
    },
    
// Moderator attributes     
    
// Organization attributes    

// parent Mod of Org    
    org_pi_moderator: { // 23:40 -> What is the advantage of this? This is a default id by mongodb
    type: Schema.ObjectId,
    ref: 'Moderator' // 3.22.18 00:06 -> is this okay?  
  },
    
// The Address of Operation should go below 

  org_line1_address:{ // Street address, P.O. box, company name, c/o
    type: String, 
    trim: true, 
    default: "Address Line1: Street address, P.O. box, company name, c/o"
    //required: "Address Line1: Street address, P.O. box, company name, c/o is required"
  },
//     
  org_line2_address:{ // Apartment, suite , unit, building, floor, etc.
    type: String, 
    trim: true, 
    default: 'ORGANIZATION Address Line2: Apartment, suite , unit, building, floor, etc.'
    //required: "ORGANIZATION Address Line2: Apartment, suite , unit, building, floor, etc. is required"
  },
    
  org_city_address: {   
    type: String, 
    trim: true,
    default: "Cox's Bazar", // keeping it contextual
    //required: 'City of Organization required'
  },
    
  org_country_address: {   
    type: String, 
    trim: true,
    default: "Bangladesh",  // keeping it contextual 
    //required: 'Country of Organization required'
  },
    
  org_zip_code: {   
    type: Number, 
    //trim: true,
    default: '1000'
    //required: 'Zip of Organization required'
  },    
    
//////////////////////////    
    
// Volunteer attributes     
 


/////////////////////

// USER: Password and things I got no clue of     
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer'],
        required: 'Password required'
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        default: 'default provider',    //  Added this
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    
// Roles -> Suggested by SH Miss    
    roles: {
        type: String,
        default: 'Volunteer',
        enum: ['Volunteer' , 'Organization', 'Moderator', 'Sysadmin']   // Want to create models
    },
    
//  Update/created    
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

var User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
