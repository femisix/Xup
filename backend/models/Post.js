const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({                //creating our schema
   userId:{
    type: String,
    required: true
   },

   desc:{
    type: String,
    max: 500,
   },

   img:{
    type: String,
    default: ""
   },

   likes:{
    type: Array,
    default:[]
   },
   path:{
    type: String,
    default: ""
   }
},
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);