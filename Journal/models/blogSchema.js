const mongoose = require("mongoose");

//creating a schema for the blog
const blogSchema = mongoose.Schema(
    {
    title:{
        type:String,
        required:[true]
    },
    happenings:{
        type:String,
        required:[true]
    }
    
   },
   {
    timestamps:true
   }
);

module.exports = mongoose.model("Blog",blogSchema)
