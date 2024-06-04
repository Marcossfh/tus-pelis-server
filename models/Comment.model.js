const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {

    text:{
      type: String,
    } ,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }, 
    movie:{
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }
    
},
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
); 

const Comment = model("Comment", commentSchema);

module.exports = Comment;