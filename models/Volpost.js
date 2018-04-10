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
    ref:  'User'  //  
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

// No. of applications accepting

  total_applications:{
    type: Number, 
    default: 100
  },

//  aoe:{ // area of expertise //for volunteers
//    type: Array(7),
//    default: [0, 0, 0, 0, 0, 0, 0]  // -> no of Volunteer needed in Area of Expertise 
//  },

  aoe0:{
    type: Number,
    default: 0
  }, 
  aoe1:{
    type: Number,
    default: 0
  }, 
  aoe2:{
    type: Number,
    default: 0
  },
  aoe3:{
    type: Number,
    default: 0
  }, 
  aoe4:{
    type: Number,
    default: 0
  }, 
  aoe5:{
    type: Number,
    default: 0
  },
  aoe6:{
    type: Number,
    default: 0
  },


// Remuneration

  remuneration: { // 3/30/18 10:03 -> more on this later
    type: Boolean,
    default: false,
    required: "Mention of remuneration is required"
  },
  // ra -> remuneration amount
/*  
  remuneration_amount:{ // this has to be array corresponding to aoe. remunation will vary accordingly to skill 
    type: Array,
    default: [0, 0, 0, 0, 0, 0, 0]  // no of Volunteer needed in Area of Expertise
  },
*/  
  ra0:{
    type: Number,
    default: 0
  }, 
  ra1:{
    type: Number,
    default: 0
  }, 
  ra2:{
    type: Number,
    default: 0
  },
  ra3:{
    type: Number,
    default: 0
  }, 
  ra4:{
    type: Number,
    default: 0
  }, 
  ra5:{
    type: Number,
    default: 0
  },
  ra6:{
    type: Number,
    default: 0
  },

  // Data on created/updated
  
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
