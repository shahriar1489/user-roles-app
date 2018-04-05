// Based on the Aticle.js model 

// Candidate keys for Moderator -> moderator_id, email, username, phone 
// Attributes below: moderator_id (default), parentOrganization_id, firstName, lastName, displayName, office, username, email, phone, password, created, updated  


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = {

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  },


  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title required'
  },

  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content required'

  },



  
}

var Article = mongoose.model('Article', ArticleSchema, 'articles');
module.exports = Article;
