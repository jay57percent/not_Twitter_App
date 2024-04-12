import express from 'express';
import { getFeedPosts, getUserPosts, likePosts, commentPosts } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js'
const router = express.Router();


router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


router.patch("/:id/like", likePosts);
router.patch("/:postId/comment", commentPosts);
export default router;