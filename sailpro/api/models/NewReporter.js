/**
 * NewReporter.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

   username:{
     type:'string',
     required:true
   },
   email:{
    type:'string',
    required:true,
    unique:true
   },
   password:{
    type:'string',
    required:true,
    
   },
   city:{
    type:'string',
    required:true
   },
   mobile:{
    type:'string',
    required:true
   },
   aadhar:{
    type:'string',
    required:true
   },
   permission:{
     type:'boolean',
     required:true
   },
   role:{
     type:'string',
     required:true
   }
  },

};

