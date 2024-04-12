import mongoose from "mongoose";
const postSchema = mongoose.Schema(
{   
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type: Map,
        of: Boolean,
    },
    comments: [
        {
          commentedUserId: { type: String, required: true },
          commentedUserPicturePath :{ type: String, required: true },
          comment: { type: String, required: true },
          
        },
      ],

},
    {timestamps: true}
);
const Post = mongoose.model("Post", postSchema);

export default Post;