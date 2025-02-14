import Post from "../models/Post.js";
import User from '../models/User.js';


export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();
        const post = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(post);
    }catch (err){
        res.status(409).json({message: err.message})
    }
}

export const getFeedPosts = async( req, res) => {
    try{
        const post = await Post.find().sort({ createdAt: -1 });;
        res.status(200).json(post);
    }catch (err){
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params; 
        const post = await Post.find({userId}).sort({ createdAt: -1 });;
        res.status(200).json(post);
    }catch (err){
        res.status(404).json({message: err.message})
    }
}

export const likePosts = async (req, res) => {
    try{
        const { id } = req.params; 
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(200).json(updatedPost);
    }catch (err){
        res.status(404).json({message: err.message})
    }
}
export const commentPosts = async(req, res) => {
    const { postId } = req.params; // Get the post ID from the URL parameters
    const { commentedUserId, commentedUserPicturePath, comment } = req.body; // Get the userId and comment from the request body

    try { 
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.comments.push({ commentedUserId, commentedUserPicturePath, comment });
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}