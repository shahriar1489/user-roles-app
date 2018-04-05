/*
  STATUS: not done (22.3.18)
  // Need to mark the users who interacted with it also. 

  // Two types of Post- Volunteer and Donation
  // Volunteer Post ONLY. 

  // ATTRIBUTES -> 6 including primary key. 

*/ 

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VolpostSchema = {

  user: { // Need the Organization 
    type: Schema.ObjectId,
    ref:  'User'//'User' // Change this to Organization
  },
  
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title of the Volunteer Post is required'
  },

  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content of the Volunteer Post is required.'

  },

  no_of_volunteer_needed: {
    type: Number, 
    required: 'Total number of Volunteer required must be mentioned'
  },

  remuneration: { // 3/30/18 10:03 -> more on this later
    type: Boolean,
    default: false,
    //required: "Mention of remuneration is required"
  },
  
  remuneration_amount:{
    type: Number,  
    trim: true, 
    default: 0
  },
  
  created: {
    type: Date,
    default: Date.now
  },
  
  updated:{
    type: Date
  }
}

var Volpost = mongoose.model('Volpost', VolpostSchema, 'volposts');
module.exports = Volpost;
