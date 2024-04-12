import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    
  } from "@mui/icons-material";
  import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
  import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import UserImage from "components/UserImage";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile
}) => {
  
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("")
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserImage = useSelector((state) => state.user.picturePath);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const isUser = postUserId === loggedInUserId;
  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userId: loggedInUserId})
    })
    const updatedPost = await response.json();
    dispatch(setPost({post: updatedPost}));
    
  }
  const handleComment = async() => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "PATCH",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        commentedUserId: loggedInUserId,
        commentedUserPicturePath: loggedInUserImage,
        comment: comment
      })
    })
    
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
    
  };
  


  return (
      <WidgetWrapper m="2rem 0">
        <Friend
          isProfile={isProfile}
          isUser={isUser} 
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{mt: "1rem"}}>
          {description}
        </Typography>
        {picturePath && (
          <img 
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem"}}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="0.8rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? <FavoriteOutlined sx={{color: primary}} /> : <FavoriteBorderOutlined />}
              </IconButton>
              <Typography> {likeCount}</Typography>
            </FlexBetween>
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() =>setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography> {comments.length}</Typography>
            </FlexBetween>  
          </FlexBetween>
          <IconButton>
              <ShareOutlined />
            </IconButton>
        </FlexBetween>
        <FlexBetween gap="0.5rem">
          <UserImage image={loggedInUserImage} size="40px" />
          <InputBase 
                  placeholder="Say something..."
                  onChange={e=>setComment(e.target.value)}
                  value={comment}
                  sx={{ 
                    width: "90%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "0.3rem 1rem"
                  }}
          />
          <IconButton onClick={handleComment}>
            <SendOutlinedIcon />
          </IconButton>
        </FlexBetween>
        {isComments && (
<Box mt="0.5rem">
    {comments.map((commentObj, i) => (
    <Box key={commentObj._id || `comment-${i}`}>
        <Divider />
        <FlexBetween>
        <FlexBetween gap="0.3rem">
            
            <UserImage image={commentObj.commentedUserPicturePath} size="30px" />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            {commentObj.comment} 
            </Typography>
        </FlexBetween>
        </FlexBetween>
    </Box>
    ))}
    <Divider />
</Box>
)}


      </WidgetWrapper>
  )
}
export default PostWidget