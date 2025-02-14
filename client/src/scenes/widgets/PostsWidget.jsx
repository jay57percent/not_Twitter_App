import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []); // Default to empty array if undefined
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    console.log("Fetched posts:", data); // Debugging
    dispatch(setPosts({posts: data}));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Fetched user posts:", data); // Debugging
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, token]); // Added dependencies to useEffect

  return (
    <>
      {posts.map(({
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          isProfile={isProfile}
        />
      ))}
    </>
  );
};

export default PostsWidget;
